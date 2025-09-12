import { Author, Book } from "@prisma/client";
import { BookRepository } from "./book.repository";
import { CreateBook, UpdateBook } from "./book.schema";
import { AuthorService } from "../author/author.service";
import { GenreService } from "./genre/genre.service";
import { AuthorErrorCode, BookErrorCode } from "../../consts/error-messages";
import { BookRepoResponse } from "./book.type";

interface BookResponse {
  id: number;
  title: string;
  publishedYear: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  readingProgress?: number;
  author: {
    id: number;
    name: string;
    bio?: string | null;
  };
  genres?: {
    id: number;
    name: string;
  }[];
}

export class BookService {
  constructor(
    private bookRepo: BookRepository,
    private authorService: AuthorService,
    private genreService: GenreService
  ) {}

  private setBookResponse(book: BookRepoResponse) {
    return {
      id: book.id,
      title: book.title,
      publishedYear: book.publishedYear,
      description: book.description || undefined,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
      readingProgress: book.readingProgress || undefined,
      author: {
        id: book.authorId,
        name: book.author.name,
        bio: book.author.bio,
      },
      genres: book.genres.map(({ genre }) => ({
        id: genre.id,
        name: genre.name,
      })),
    };
  }

  async getAllBooks(): Promise<BookResponse[]> {
    const books = await this.bookRepo.findAll();
    if (!books) return [];
    return books.map((book) => this.setBookResponse(book));
  }

  async getBookById(id: number): Promise<BookResponse | null> {
    const book = await this.bookRepo.findById(id);
    console.log("HEREEE", { book });

    if (!book) return null;
    return this.setBookResponse(book);
  }

  async createBook(data: CreateBook): Promise<BookResponse | null> {
    let author: Author;
    if (data.authorId) {
      author = await this.authorService.getAuthorById(data.authorId);
      if (!author) throw new Error(AuthorErrorCode.NOT_FOUND);
    } else if (data.author) {
      author = await this.authorService.createAuthor(data.author);
    } else {
      throw new Error(BookErrorCode.AUTHOR_ID_OR_AUTHOR_REQUIRED);
    }

    const genreIds = await this.genreService.getOrCreateIds(data.genres ?? []);
    if (data.genreIds?.length) {
      const isValid = await this.genreService.checkGenreExists(data.genreIds);
      if (isValid) genreIds.push(...data.genreIds);
    }

    const book = await this.bookRepo.create({
      title: data.title,
      publishedYear: data.publishedYear,
      description: data.description,
      author: { connect: author },
    });

    if (genreIds.length) await this.bookRepo.attachGenres(book.id, genreIds);

    const findBook = await this.bookRepo.findById(book.id);

    if (!findBook) return null;
    return this.setBookResponse(findBook);
  }

  async updateBook(id: number, data: UpdateBook): Promise<BookResponse | null> {
    const existingBook = await this.bookRepo.findById(id);
    if (!existingBook) throw new Error(BookErrorCode.NOT_FOUND);

    let authorId: number | undefined;
    if (data.authorId) authorId = data.authorId;
    if (data.author) {
      const author = await this.authorService.createAuthor(data.author);
      authorId = author.id;
    }

    const book = await this.bookRepo.update(id, {
      title: data.title,
      publishedYear: data.publishedYear,
      ...(authorId && { author: { connect: { id: authorId } } }),
    });

    const genreIds = await this.genreService.getOrCreateIds(data.genres ?? []);
    if (data.genreIds?.length) {
      const isValid = await this.genreService.checkGenreExists(data.genreIds);
      if (isValid) genreIds.push(...data.genreIds);
    }
    await this.bookRepo.detachGenres(book.id, []);

    if (genreIds.length) await this.bookRepo.attachGenres(book.id, genreIds);
    const findBook = await this.bookRepo.findById(book.id);
    if (!findBook) return null;
    return this.setBookResponse(findBook);
  }

  async deleteBook(id: number): Promise<void> {
    await this.bookRepo.detachGenres(id, []);
    await this.bookRepo.delete(id);
    return;
  }
}
