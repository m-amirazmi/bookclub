import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
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

// Reusable validation preHandlers
const validateParams = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const result = authorParamsSchema.safeParse(request.params);
  if (!result.success) {
    return reply.code(400).send({
      success: false,
      error: "Invalid parameters",
      details: result.error.errors,
    });
  }
};

const validateCreateBody = async (
  request: FastifyRequest<{ Body: CreateAuthor }>,
  reply: FastifyReply
) => {
  const result = createAuthorSchema.safeParse(request.body);
  if (!result.success) {
    return reply.code(400).send({
      success: false,
      error: "Validation failed",
      details: result.error.errors,
    });
  }
  request.body = result.data;
};

const validateUpdate = async (
  request: FastifyRequest<{ Body: UpdateAuthor; Params: { id: string } }>,
  reply: FastifyReply
) => {
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
};

export default async function authorRoutes(server: FastifyInstance) {
  const authorRepo = new AuthorRepository(server.db);
  const authorService = new AuthorService(authorRepo);
  const controller = new AuthorController(authorService);

  server.get("/", async (req, res) => controller.getAll(req, res));

  server.get("/:id", { preHandler: validateParams }, async (req, res) =>
    controller.getById(req, res)
  );

  server.post("/", { preHandler: validateCreateBody }, async (req, res) =>
    controller.create(req, res)
  );

  server.patch("/:id", { preHandler: validateUpdate }, async (req, res) =>
    controller.update(req, res)
  );

  server.delete("/:id", { preHandler: validateParams }, async (req, res) =>
    controller.delete(req, res)
  );
}
