import { Genre, PrismaClient } from "@prisma/client";
import { CreateGenre, UpdateGenre } from "./genre.schema";

export class GenreRepository {
  constructor(private db: PrismaClient) {}

  async findAll(): Promise<Genre[]> {
    return await this.db.genre.findMany({ orderBy: { name: "asc" } });
  }

  async findById(id: number): Promise<Genre | null> {
    return await this.db.genre.findUnique({ where: { id } });
  }

  async create(data: CreateGenre): Promise<Genre> {
    return await this.db.genre.create({ data });
  }

  async update(id: number, data: UpdateGenre): Promise<Genre | null> {
    return await this.db.genre.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        updatedAt: new Date(),
      },
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
