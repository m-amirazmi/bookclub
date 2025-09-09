import type { FastifyInstance } from "fastify";
import { AuthorRepository } from "./author.repository";
import { AuthorService } from "./author.service";
import { AuthorController } from "./author.controller";
import {
  authorParamsSchema,
  CreateAuthor,
  createAuthorSchema,
  UpdateAuthor,
  updateAuthorSchema,
} from "./author.schema";

export default async function authorRoutes(server: FastifyInstance) {
  const authorRepo = new AuthorRepository(server.db);
  const authorService = new AuthorService(authorRepo);
  const authorController = new AuthorController(authorService);

  server.get("/", authorController.getAll.bind(authorController));

  server.get<{ Params: { id: string } }>(
    "/:id",
    {
      preHandler: async (request, reply) => {
        const result = authorParamsSchema.safeParse(request.params);
        if (!result.success) {
          return reply.code(400).send({
            success: false,
            error: "Invalid parameters",
            details: result.error.errors,
          });
        }
      },
    },
    authorController.getById.bind(authorController)
  );

  server.post<{ Body: CreateAuthor }>(
    "/",
    {
      preHandler: async (request, reply) => {
        const result = createAuthorSchema.safeParse(request.body);
        if (!result.success) {
          return reply.code(400).send({
            success: false,
            error: "Validation failed",
            details: result.error.errors,
          });
        }
        request.body = result.data;
      },
    },
    authorController.create.bind(authorController)
  );

  server.patch<{ Body: UpdateAuthor; Params: { id: string } }>(
    "/:id",
    {
      preHandler: async (request, reply) => {
        const paramsResult = authorParamsSchema.safeParse(request.params);
        if (!paramsResult.success) {
          return reply.code(400).send({
            success: false,
            error: "Invalid parameters",
            details: paramsResult.error.errors,
          });
        }

        const bodyResult = updateAuthorSchema.safeParse(request.body);
        if (!bodyResult.success) {
          return reply.code(400).send({
            success: false,
            error: "Validation failed",
            details: bodyResult.error.errors,
          });
        }
        request.body = bodyResult.data;
      },
    },
    authorController.update.bind(authorController)
  );

  server.delete<{ Params: { id: string } }>(
    "/:id",
    {
      preHandler: async (request, reply) => {
        const result = authorParamsSchema.safeParse(request.params);
        if (!result.success) {
          return reply.code(400).send({
            success: false,
            error: "Invalid parameters",
            details: result.error.errors,
          });
        }
      },
    },
    authorController.delete.bind(authorController)
  );
}
