import { FastifyInstance } from "fastify";
import { LoggerHelper } from "../../utils/logger-helper";
import { validate, ValidationFor } from "../../utils/validations";
import {
  BookParams,
  bookParamsSchema,
  CreateBook,
  createBookSchema,
  UpdateBook,
  updateBookSchema,
} from "./book.schema";
import { AuthorRepository } from "../author/author.repository";
import { AuthorService } from "../author/author.service";
import { GenreRepository } from "./genre/genre.repository";
import { GenreService } from "./genre/genre.service";
import { BookRepository } from "./book.repository";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";

const logger = new LoggerHelper("BookRoute");

const validateParams = validate<BookParams>({
  schema: bookParamsSchema,
  type: ValidationFor.PARAMS,
  logger,
});

const validateBodyCreate = validate<CreateBook>({
  schema: createBookSchema,
  type: ValidationFor.BODY,
  logger,
});

const validateBodyUpdate = validate<UpdateBook>({
  schema: updateBookSchema,
  type: ValidationFor.BODY,
  logger,
});

export default async function bookRoutes(server: FastifyInstance) {
  const authorRepo = new AuthorRepository(server.db);
  const authorService = new AuthorService(authorRepo);
  const genreRepo = new GenreRepository(server.db);
  const genreService = new GenreService(genreRepo);
  const bookRepo = new BookRepository(server.db);
  const bookService = new BookService(bookRepo, authorService, genreService);
  const controller = new BookController(bookService);

  server.get("/", async (req, res) => controller.getAll(req, res));

  server.get<{ Params: BookParams }>(
    "/:id",
    { preHandler: validateParams },
    async (req, res) => controller.getById(req, res)
  );

  server.post<{ Body: CreateBook }>(
    "/",
    { preHandler: validateBodyCreate },
    async (req, res) => controller.create(req, res)
  );

  server.patch<{ Params: BookParams; Body: UpdateBook }>(
    "/:id",
    { preHandler: [validateParams, validateBodyUpdate] },
    async (req, res) => controller.update(req, res)
  );

  server.delete<{ Params: BookParams }>(
    "/:id",
    { preHandler: validateParams },
    async (req, res) => controller.delete(req, res)
  );
}
