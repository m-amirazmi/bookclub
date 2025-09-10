import { Author, Prisma, PrismaClient } from "@prisma/client";

export class AuthorRepository {
  constructor(private db: PrismaClient) {}

  async findAll(): Promise<Author[]> {
    return await this.db.author.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findById(id: number): Promise<Author | null> {
    return await this.db.author.findUnique({ where: { id } });
  }

  async create(data: Prisma.AuthorCreateInput): Promise<Author> {
    return await this.db.author.create({ data });
  }

  async update(
    id: number,
    data: Prisma.AuthorUpdateInput
  ): Promise<Author | null> {
    return await this.db.author.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
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
