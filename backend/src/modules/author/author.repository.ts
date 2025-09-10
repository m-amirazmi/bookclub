import { Author, PrismaClient } from "@prisma/client";
import { CreateAuthor, UpdateAuthor } from "./author.schema";

export class AuthorRepository {
  constructor(private db: PrismaClient) {}

  async findAll(): Promise<Author[]> {
    return await this.db.author.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findById(id: number): Promise<Author | null> {
    return await this.db.author.findUnique({ where: { id } });
  }

  async create(data: CreateAuthor): Promise<Author> {
    return await this.db.author.create({ data });
  }

  async update(id: number, data: UpdateAuthor): Promise<Author | null> {
    return await this.db.author.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.bio !== undefined && { bio: data.bio }),
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: number): Promise<Author | null> {
    return await this.db.author.delete({ where: { id } });
  }

  async findByName(name: string): Promise<Author | null> {
    return await this.db.author.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
    });
  }
}
