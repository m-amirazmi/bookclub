import { Book, Prisma, PrismaClient } from "@prisma/client";
import { BookRepoResponse } from "./book.type";

export class BookRepository {
  constructor(private db: PrismaClient) {}

  async findAll(): Promise<BookRepoResponse[] | null> {
    return await this.db.book.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        genres: {
          include: { genre: true },
        },
      },
    });
  }

  async findById(id: number): Promise<BookRepoResponse | null> {
    return await this.db.book.findUnique({
      where: { id },
      include: {
        author: true,
        genres: { include: { genre: true } },
      },
    });
  }

  async create(data: Prisma.BookCreateInput): Promise<BookRepoResponse> {
    return await this.db.book.create({
      data,
      include: {
        author: true,
        genres: { include: { genre: true } },
      },
    });
  }

  async update(
    id: number,
    data: Prisma.BookUpdateInput
  ): Promise<BookRepoResponse> {
    return await this.db.book.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
      include: {
        author: true,
        genres: { include: { genre: true } },
      },
    });
  }

  async delete(id: number): Promise<Book | null> {
    return await this.db.book.delete({ where: { id } });
  }

  async attachGenres(
    bookId: number,
    genreIds: number[]
  ): Promise<Prisma.BatchPayload> {
    const data = genreIds.map((genreId) => ({ bookId, genreId }));
    return await this.db.bookGenre.createMany({ data, skipDuplicates: true });
  }

  async detachGenres(
    bookId: number,
    genreIds: number[]
  ): Promise<Prisma.BatchPayload> {
    return await this.db.bookGenre.deleteMany({
      where: {
        bookId,
        genreId: { in: genreIds },
      },
    });
  }
}
