import { FastifyRequest, FastifyReply } from "fastify";
import { AuthorParams, CreateAuthor, UpdateAuthor } from "./author.schema";
import { AuthorService } from "./author.service";

export class AuthorController {
  constructor(private authorService: AuthorService) {}

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const authors = await this.authorService.getAllAuthors();
      return reply.code(200).send({
        success: true,
        data: authors,
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        success: false,
        error: "Internal Server Error",
      });
    }
  }

  async getById(
    request: FastifyRequest<{ Params: AuthorParams }>,
    reply: FastifyReply
  ) {
    try {
      const id = parseInt(request.params.id);
      const author = await this.authorService.getAuthorById(id);

      return reply.code(200).send({
        success: true,
        data: author,
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Author not found") {
        return reply.code(404).send({
          success: false,
          error: "Author not found",
        });
      }

      request.log.error(error);
      return reply.code(500).send({
        success: false,
        error: "Internal Server Error",
      });
    }
  }

  async create(
    request: FastifyRequest<{ Body: CreateAuthor }>,
    reply: FastifyReply
  ) {
    try {
      const author = await this.authorService.createAuthor(request.body);
      return reply.success({
        data: author,
        statusCode: 201,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Author with this name already exists"
      ) {
        return reply.code(409).send({
          success: false,
          error: error.message,
        });
      }

      request.log.error(error);
      return reply.code(400).send({
        success: false,
        error: "Bad Request",
      });
    }
  }

  async update(
    request: FastifyRequest<{
      Params: AuthorParams;
      Body: UpdateAuthor;
    }>,
    reply: FastifyReply
  ) {
    try {
      const id = parseInt(request.params.id);
      const author = await this.authorService.updateAuthor(id, request.body);

      return reply.code(200).send({
        success: true,
        data: author,
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Author not found") {
        return reply.code(404).send({
          success: false,
          error: "Author not found",
        });
      }

      if (
        error instanceof Error &&
        error.message === "Author with this name already exists"
      ) {
        return reply.code(409).send({
          success: false,
          error: error.message,
        });
      }

      request.log.error(error);
      return reply.code(400).send({
        success: false,
        error: "Bad Request",
      });
    }
  }

  async delete(
    request: FastifyRequest<{ Params: AuthorParams }>,
    reply: FastifyReply
  ) {
    try {
      const id = parseInt(request.params.id);
      await this.authorService.deleteAuthor(id);

      return reply.code(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "Author not found") {
        return reply.code(404).send({
          success: false,
          error: "Author not found",
        });
      }

      request.log.error(error);
      return reply.code(500).send({
        success: false,
        error: "Internal Server Error",
      });
    }
  }
}
