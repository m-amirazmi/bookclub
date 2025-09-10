import { Genre } from "@prisma/client";
import { GenreErrorCode } from "../../../consts/error-messages";
import { GenreRepository } from "./genre.repository";
import { CreateGenre, UpdateGenre } from "./genre.schema";

interface GenreInput {
  name: string;
}

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
    return await this.genreRepo.create(data);
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

  async getOrCreateIds(genres: GenreInput[]): Promise<number[]> {
    if (!genres.length) return [];
    const ids: number[] = [];
    for (const g of genres) {
      let genre = await this.genreRepo.findByName(g.name);
      if (!genre) genre = await this.genreRepo.create({ name: g.name });
      ids.push(genre.id);
    }
    return ids;
  }

  async checkGenreExists(genreIds: number[]): Promise<boolean> {
    const existingGenres = await this.genreRepo.findExistingGenres(genreIds);
    if (existingGenres.length !== genreIds.length) {
      throw new Error(GenreErrorCode.SOME_INVALID);
    }
    return true;
  }
}
