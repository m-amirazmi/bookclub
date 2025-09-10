import { Author, Book } from "@prisma/client";
import { BookRepository } from "./book.repository";
import { CreateBook, UpdateBook } from "./book.schema";
import { AuthorService } from "../author/author.service";
import { GenreService } from "./genre/genre.service";
import { AuthorErrorCode, BookErrorCode } from "../../consts/error-messages";

export class BookService {
  constructor(
    private bookRepo: BookRepository,
    private authorService: AuthorService,
    private genreService: GenreService
  ) {}

  async getAllBooks() {
    return await this.bookRepo.findAll();
  }

  async getBookById(id: number) {
    return await this.bookRepo.findById(id);
  }

  async createBook(data: CreateBook): Promise<Book | null> {
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
      author: { connect: author },
    });

    if (genreIds.length) await this.bookRepo.attachGenres(book.id, genreIds);

    return await this.bookRepo.findById(book.id);
  }

  async updateBook(id: number, data: UpdateBook): Promise<Book | null> {
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
    return this.bookRepo.findById(book.id);
  }

  async deleteBook(id: number): Promise<void> {
    await this.bookRepo.detachGenres(id, []);
    await this.bookRepo.delete(id);
    return;
  }
}
