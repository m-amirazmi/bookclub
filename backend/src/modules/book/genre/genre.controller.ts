import { FastifyReply, FastifyRequest } from "fastify";
import { HttpStatus } from "../../../consts/http-status";
import { mapErrorToResponse } from "../../../utils/error-mapper";
import { LoggerHelper } from "../../../utils/logger-helper";

import { CreateGenre, GenreParams, UpdateGenre } from "./genre.schema";
import { GenreService } from "./genre.service";

export class GenreController {
  private logger: LoggerHelper;

  constructor(private genreService: GenreService) {
    this.logger = new LoggerHelper(GenreController.name);
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const log = this.logger.log(request, this.getAll.name);
    log.info("Fetching all genres");

    try {
      const genres = await this.genreService.getAllGenres();
      return reply.success({ data: genres });
    } catch (error) {
      log.error(error);
      return reply.error(mapErrorToResponse(error));
    }
  }

  async getById(
    request: FastifyRequest<{ Params: GenreParams }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const log = this.logger.log(request, this.getById.name);
    log.info("Fetching genre by ID: " + id);

    try {
      const genre = await this.genreService.getGenreById(id);
      return reply.success({ data: genre });
    } catch (error) {
      log.error(error);
      return reply.error(mapErrorToResponse(error));
    }
  }

  async create(
    request: FastifyRequest<{ Body: CreateGenre }>,
    reply: FastifyReply
  ) {
    const log = this.logger.log(request, this.create.name);
    log.info("Creating new genre");

    try {
      const genre = await this.genreService.createGenre(request.body);
      return reply.success({
        data: genre,
        statusCode: HttpStatus.CREATED,
      });
    } catch (error) {
      log.error(error);
      return reply.error(mapErrorToResponse(error));
    }
  }

  async update(
    request: FastifyRequest<{
      Params: GenreParams;
      Body: UpdateGenre;
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const log = this.logger.log(request, this.update.name);
    log.info("Updating genre by ID: " + id);

    try {
      const genre = await this.genreService.updateGenre(id, request.body);
      return reply.success({ data: genre });
    } catch (error) {
      log.error(error);
      return reply.error(mapErrorToResponse(error));
    }
  }

  async delete(
    request: FastifyRequest<{ Params: GenreParams }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const log = this.logger.log(request, this.delete.name);
    log.info("Deleting genre by ID: " + id);

    try {
      await this.genreService.deleteGenre(id);
      return reply.success({ data: null, statusCode: HttpStatus.NO_CONTENT });
    } catch (error) {
      log.error(error);
      return reply.error(mapErrorToResponse(error));
    }
  }
}
