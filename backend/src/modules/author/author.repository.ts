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
    try {
      return await this.db.author.update({
        where: { id },
        data: {
          ...(data.name && { name: data.name }),
          ...(data.bio && { bio: data.bio }),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as any).code === "P2025"
      ) {
        return null;
      }
      throw error;
    }
  }

  async delete(id: number): Promise<Author | null> {
    try {
      return await this.db.author.delete({ where: { id } });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as any).code === "P2025"
      ) {
        return null;
      }
      throw error;
    }
  }

  async findByName(name: string): Promise<Author | null> {
    return await this.db.author.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
    });
  }
}
