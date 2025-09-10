import type { FastifyInstance } from "fastify";
import { LoggerHelper } from "../../utils/logger-helper";
import { validate, ValidationFor } from "../../utils/validations";
import { AuthorController } from "./author.controller";
import { AuthorRepository } from "./author.repository";
import {
  AuthorParams,
  authorParamsSchema,
  CreateAuthor,
  createAuthorSchema,
  UpdateAuthor,
  updateAuthorSchema,
} from "./author.schema";
import { AuthorService } from "./author.service";

const logger = new LoggerHelper("AuthorRoute");

const validateParams = validate<AuthorParams>({
  schema: authorParamsSchema,
  type: ValidationFor.PARAMS,
  logger,
});

const validateBodyCreate = validate<CreateAuthor>({
  schema: createAuthorSchema,
  type: ValidationFor.BODY,
  logger,
});

const validateBodyUpdate = validate<UpdateAuthor>({
  schema: updateAuthorSchema,
  type: ValidationFor.BODY,
  logger,
});

export default async function authorRoutes(server: FastifyInstance) {
  const authorRepo = new AuthorRepository(server.db);
  const authorService = new AuthorService(authorRepo);
  const controller = new AuthorController(authorService);

  server.get("/", async (req, res) => controller.getAll(req, res));

  server.get<{ Params: AuthorParams }>(
    "/:id",
    { preHandler: validateParams },
    async (req, res) => controller.getById(req, res)
  );

  server.post<{ Body: CreateAuthor }>(
    "/",
    { preHandler: validateBodyCreate },
    async (req, res) => controller.create(req, res)
  );

  server.patch<{ Params: AuthorParams; Body: UpdateAuthor }>(
    "/:id",
    { preHandler: [validateParams, validateBodyUpdate] },
    async (req, res) => controller.update(req, res)
  );

  server.delete<{ Params: AuthorParams }>(
    "/:id",
    { preHandler: validateParams },
    async (req, res) => controller.delete(req, res)
  );
}
