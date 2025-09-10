import { FastifyReply, FastifyRequest } from "fastify";
import {
  AuthorErrorMessages,
  CommonErrorMessages,
} from "../../consts/error-messages";
import { HttpStatus } from "../../consts/http-status";
import { ErrorResponseParamType } from "../../plugins/response.plugin";
import { LoggerHelper } from "../../utils/logger-helper";
import { AuthorParams, CreateAuthor, UpdateAuthor } from "./author.schema";
import { AuthorService } from "./author.service";

export class AuthorController {
  private readonly logger: LoggerHelper;

  constructor(private authorService: AuthorService) {
    this.logger = new LoggerHelper(AuthorController.name);
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const log = this.logger.log(request, this.getAll.name);
    log.info("Fetching all authors");

    try {
      const authors = await this.authorService.getAllAuthors();
      return reply.success({ data: authors });
    } catch (error) {
      log.error(error);
      return reply.error({
        errorMessage: CommonErrorMessages.INTERNAL_SERVER_ERROR,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async getById(
    request: FastifyRequest<{ Params: AuthorParams }>,
    reply: FastifyReply
  ) {
    const id = parseInt(request.params.id);
    const log = this.logger.log(request, this.getById.name);
    log.info("Fetching author by ID: " + id);

    try {
      const author = await this.authorService.getAuthorById(id);
      return reply.success({ data: author });
    } catch (error) {
      log.error(error);
      const errorObj: ErrorResponseParamType = {
        errorMessage: CommonErrorMessages.INTERNAL_SERVER_ERROR,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
      if (
        error instanceof Error &&
        error.message === AuthorErrorMessages.AUTHOR_NOT_FOUND
      ) {
        errorObj.errorMessage = error.message;
        errorObj.statusCode = HttpStatus.NOT_FOUND;
      }
      return reply.error(errorObj);
    }
  }

  async create(
    request: FastifyRequest<{ Body: CreateAuthor }>,
    reply: FastifyReply
  ) {
    const log = this.logger.log(request, this.create.name);
    log.info("Creating new author");

    try {
      const author = await this.authorService.createAuthor(request.body);
      return reply.success({
        data: author,
        statusCode: HttpStatus.CREATED,
      });
    } catch (error) {
      log.error(error);
      const errorObj: ErrorResponseParamType = {
        errorMessage: CommonErrorMessages.INTERNAL_SERVER_ERROR,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
      if (
        error instanceof Error &&
        error.message === AuthorErrorMessages.AUTHOR_ALREADY_EXISTS
      ) {
        errorObj.errorMessage = error.message;
        errorObj.statusCode = HttpStatus.CONFLICT;
      }
      return reply.error(errorObj);
    }
  }

  async update(
    request: FastifyRequest<{
      Params: AuthorParams;
      Body: UpdateAuthor;
    }>,
    reply: FastifyReply
  ) {
    const id = parseInt(request.params.id);
    const log = this.logger.log(request, this.update.name);
    log.info("Updating author by ID: " + id);

    try {
      const author = await this.authorService.updateAuthor(id, request.body);
      return reply.success({ data: author });
    } catch (error) {
      log.error(error);
      const errorObj: ErrorResponseParamType = {
        errorMessage: CommonErrorMessages.INTERNAL_SERVER_ERROR,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
      if (
        error instanceof Error &&
        error.message === AuthorErrorMessages.AUTHOR_NOT_FOUND
      ) {
        errorObj.errorMessage = error.message;
        errorObj.statusCode = HttpStatus.NOT_FOUND;
      }
      if (
        error instanceof Error &&
        error.message === AuthorErrorMessages.AUTHOR_ALREADY_EXISTS
      ) {
        errorObj.errorMessage = error.message;
        errorObj.statusCode = HttpStatus.CONFLICT;
      }
      return reply.error(errorObj);
    }
  }

  async delete(
    request: FastifyRequest<{ Params: AuthorParams }>,
    reply: FastifyReply
  ) {
    const id = parseInt(request.params.id);
    const log = this.logger.log(request, this.delete.name);
    log.info("Deleting author by ID: " + id);

    try {
      await this.authorService.deleteAuthor(id);
      return reply.success({ data: null, statusCode: HttpStatus.NO_CONTENT });
    } catch (error) {
      log.error(error);
      const errorObj: ErrorResponseParamType = {
        errorMessage: CommonErrorMessages.INTERNAL_SERVER_ERROR,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
      return reply.error(errorObj);
    }
  }
}
