import type { FastifyInstance } from "fastify";
import { LoggerHelper } from "../../../utils/logger-helper";
import { validate, ValidationFor } from "../../../utils/validations";
import { GenreController } from "./genre.controller";
import { GenreRepository } from "./genre.repository";
import {
  CreateGenre,
  createGenreSchema,
  GenreParams,
  genreParamsSchema,
  UpdateGenre,
  updateGenreSchema,
} from "./genre.schema";
import { GenreService } from "./genre.service";

const logger = new LoggerHelper("GenreRoute");

const validateParams = validate<GenreParams>({
  schema: genreParamsSchema,
  type: ValidationFor.PARAMS,
  logger,
});

const validateBodyCreate = validate<CreateGenre>({
  schema: createGenreSchema,
  type: ValidationFor.BODY,
  logger,
});

const validateBodyUpdate = validate<UpdateGenre>({
  schema: updateGenreSchema,
  type: ValidationFor.BODY,
  logger,
});

export default async function genreRoutes(server: FastifyInstance) {
  const genreRepo = new GenreRepository(server.db);
  const genreService = new GenreService(genreRepo);
  const controller = new GenreController(genreService);

  server.get("/", async (req, res) => controller.getAll(req, res));

  server.get<{ Params: GenreParams }>(
    "/:id",
    { preHandler: validateParams },
    async (req, res) => controller.getById(req, res)
  );

  server.post<{ Body: CreateGenre }>(
    "/",
    { preHandler: validateBodyCreate },
    async (req, res) => controller.create(req, res)
  );

  server.patch<{ Body: CreateGenre; Params: GenreParams }>(
    "/:id",
    { preHandler: [validateParams, validateBodyUpdate] },
    async (req, res) => controller.update(req, res)
  );

  server.delete<{ Params: GenreParams }>(
    "/:id",
    { preHandler: validateParams },
    async (req, res) => controller.delete(req, res)
  );
}
