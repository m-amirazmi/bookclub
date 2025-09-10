import { FastifyReply, FastifyRequest } from "fastify";
import { BookService } from "./book.service";
import { LoggerHelper } from "../../utils/logger-helper";
import { mapErrorToResponse } from "../../utils/error-mapper";
import { BookParams, CreateBook, UpdateBook } from "./book.schema";
import { HttpStatus } from "../../consts/http-status";

export class BookController {
  private logger: LoggerHelper;
  constructor(private bookService: BookService) {
    this.logger = new LoggerHelper(BookController.name);
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const log = this.logger.log(request, this.getAll.name);
    log.info("Fetching all books");

    try {
      const books = await this.bookService.getAllBooks();
      return reply.success({ data: books });
    } catch (error) {
      log.error(error);
      return reply.error(mapErrorToResponse(error));
    }
  }

  async getById(
    request: FastifyRequest<{ Params: BookParams }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const log = this.logger.log(request, this.getById.name);
    log.info("Fetching book by ID: " + id);

    try {
      const book = await this.bookService.getBookById(id);
      return reply.success({ data: book });
    } catch (error) {
      log.error(error);
      return reply.error(mapErrorToResponse(error));
    }
  }

  async create(
    request: FastifyRequest<{ Body: CreateBook }>,
    reply: FastifyReply
  ) {
    const log = this.logger.log(request, this.create.name);
    log.info("Creating new book");

    try {
      const book = await this.bookService.createBook(request.body);
      return reply.success({
        data: book,
        statusCode: HttpStatus.CREATED,
      });
    } catch (error) {
      log.error(error);
      return reply.error(mapErrorToResponse(error));
    }
  }

  async update(
    request: FastifyRequest<{ Params: BookParams; Body: UpdateBook }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const log = this.logger.log(request, this.update.name);
    log.info("Updating book by ID: " + id);

    try {
      const book = await this.bookService.updateBook(id, request.body);
      return reply.success({ data: book });
    } catch (error) {
      log.error(error);
      return reply.error(mapErrorToResponse(error));
    }
  }

  async delete(
    request: FastifyRequest<{ Params: BookParams }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const log = this.logger.log(request, this.delete.name);
    log.info("Deleting book by ID: " + id);

    try {
      await this.bookService.deleteBook(id);
      return reply.success({ data: null, statusCode: HttpStatus.NO_CONTENT });
    } catch (error) {
      log.error(error);
      return reply.error(mapErrorToResponse(error));
    }
  }
}
