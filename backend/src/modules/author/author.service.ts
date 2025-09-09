import { Author } from "@prisma/client";
import { AuthorRepository } from "./author.repository";
import { CreateAuthor, UpdateAuthor } from "./author.schema";

export class AuthorService {
  constructor(private authorRepo: AuthorRepository) {}

  async getAllAuthors() {
    return await this.authorRepo.findAll();
  }

  async getAuthorById(id: number) {
    const author = await this.authorRepo.findById(id);
    if (!author) {
      throw new Error("Author not found");
    }
    return author;
  }

  async createAuthor(data: CreateAuthor): Promise<Author> {
    const existingAuthor = await this.authorRepo.findByName(data.name);
    if (existingAuthor) {
      throw new Error("Author with this name already exists");
    }

    return this.authorRepo.create(data);
  }

  async updateAuthor(id: number, data: UpdateAuthor): Promise<Author> {
    const existingAuthor = await this.authorRepo.findById(id);
    if (!existingAuthor) {
      throw new Error("Author not found");
    }

    if (data.name && data.name !== existingAuthor.name) {
      const duplicateAuthor = await this.authorRepo.findByName(data.name);
      if (duplicateAuthor && duplicateAuthor.id !== id) {
        throw new Error("Author with this name already exists");
      }
    }

    const updatedAuthor = await this.authorRepo.update(id, data);
    if (!updatedAuthor) {
      throw new Error("Author not found");
    }

    return updatedAuthor;
  }

  async deleteAuthor(id: number): Promise<void> {
    const deleted = await this.authorRepo.delete(id);
    if (!deleted) {
      throw new Error("Author not found");
    }
  }
}
