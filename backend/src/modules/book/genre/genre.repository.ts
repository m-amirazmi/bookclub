import { Genre, Prisma, PrismaClient } from "@prisma/client";

export class GenreRepository {
  constructor(private db: PrismaClient) {}

  async findAll(): Promise<Genre[]> {
    return await this.db.genre.findMany({ orderBy: { name: "asc" } });
  }

  async findById(id: number): Promise<Genre | null> {
    return await this.db.genre.findUnique({ where: { id } });
  }

  async findExistingGenres(ids: number[]) {
    return await this.db.genre.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });
  }

  async create(data: Prisma.GenreCreateInput): Promise<Genre> {
    return await this.db.genre.create({ data });
  }

  async update(
    id: number,
    data: Prisma.GenreUpdateInput
  ): Promise<Genre | null> {
    return await this.db.genre.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async delete(id: number): Promise<Genre | null> {
    return await this.db.genre.delete({ where: { id } });
  }

  async findByName(name: string): Promise<Genre | null> {
    return await this.db.genre.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
    });
  }
}
