import { Book, Prisma, PrismaClient } from "@prisma/client";

type BookResponse = Prisma.BookGetPayload<{
  include: {
    author: true;
    genres: { include: { genre: true } };
    readingProgress: true;
  };
}>;

export class BookRepository {
  constructor(private db: PrismaClient) {}

  async findAll(): Promise<BookResponse[] | null> {
    return await this.db.book.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        genres: {
          include: { genre: true },
        },
        readingProgress: true,
      },
    });
  }

  async findById(id: number): Promise<BookResponse | null> {
    return await this.db.book.findUnique({
      where: { id },
      include: {
        author: true,
        genres: { include: { genre: true } },
        readingProgress: true,
      },
    });
  }

  async create(data: Prisma.BookCreateInput): Promise<BookResponse> {
    return await this.db.book.create({
      data: {
        title: data.title,
        publishedYear: data.publishedYear,
        author: data.author,
        readingProgress: data.readingProgress,
      },
      include: {
        author: true,
        genres: { include: { genre: true } },
        readingProgress: true,
      },
    });
  }

  async update(
    id: number,
    data: Prisma.BookUpdateInput
  ): Promise<BookResponse> {
    return await this.db.book.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
      include: {
        author: true,
        genres: { include: { genre: true } },
        readingProgress: true,
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
