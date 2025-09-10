import { Genre } from "@prisma/client";
import { GenreErrorCode } from "../../../consts/error-messages";
import { GenreRepository } from "./genre.repository";
import { CreateGenre, UpdateGenre } from "./genre.schema";

export class GenreService {
  constructor(private genreRepo: GenreRepository) {}

  async getAllGenres() {
    return await this.genreRepo.findAll();
  }

  async getGenreById(id: number) {
    const genre = await this.genreRepo.findById(id);
    if (!genre) throw new Error(GenreErrorCode.NOT_FOUND);
    return genre;
  }

  async createGenre(data: CreateGenre): Promise<Genre> {
    const existingGenre = await this.genreRepo.findByName(data.name);
    if (existingGenre) throw new Error(GenreErrorCode.ALREADY_EXISTS);
    return this.genreRepo.create(data);
  }

  async updateGenre(id: number, data: UpdateGenre): Promise<Genre> {
    const existingGenre = await this.genreRepo.findById(id);
    if (!existingGenre) throw new Error(GenreErrorCode.NOT_FOUND);

    if (data.name && data.name !== existingGenre.name) {
      const duplicateGenre = await this.genreRepo.findByName(data.name);
      if (duplicateGenre && duplicateGenre.id !== id) {
        throw new Error(GenreErrorCode.ALREADY_EXISTS);
      }
    }

    const updatedGenre = await this.genreRepo.update(id, data);
    if (!updatedGenre) throw new Error(GenreErrorCode.NOT_FOUND);
    return updatedGenre;
  }

  async deleteGenre(id: number): Promise<void> {
    const deleted = await this.genreRepo.delete(id);
    if (!deleted) return;
  }
}
