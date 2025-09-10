import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CommonErrorMessages } from "../../consts/error-messages";
import { LoggerHelper } from "../../utils/logger-helper";
import { AuthorController } from "./author.controller";
import { AuthorRepository } from "./author.repository";
import {
  authorParamsSchema,
  CreateAuthor,
  createAuthorSchema,
  UpdateAuthor,
  updateAuthorSchema,
} from "./author.schema";
import { AuthorService } from "./author.service";

const logger = new LoggerHelper("AuthorRoute");

// Reusable validation preHandlers
const validateParams = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const log = logger.log(request, validateParams.name);
  log.info("Validating parameters");
  const result = authorParamsSchema.safeParse(request.params);
  if (!result.success) {
    log.error(CommonErrorMessages.INVALID_PARAMETERS);
    return reply.error({
      errorMessage: CommonErrorMessages.INVALID_PARAMETERS,
      details: result.error.errors,
    });
  }
};

const validateCreateBody = async (
  request: FastifyRequest<{ Body: CreateAuthor }>,
  reply: FastifyReply
) => {
  const log = logger.log(request, validateCreateBody.name);
  log.info("Validating body");
  const result = createAuthorSchema.safeParse(request.body);
  if (!result.success) {
    log.error(CommonErrorMessages.VALIDATION_FAILED);
    return reply.error({
      errorMessage: CommonErrorMessages.VALIDATION_FAILED,
      details: result.error.errors,
    });
  }
  request.body = result.data;
};

const validateUpdate = async (
  request: FastifyRequest<{ Body: UpdateAuthor; Params: { id: string } }>,
  reply: FastifyReply
) => {
  const log = logger.log(request, validateCreateBody.name);
  log.info("Validating parameters");
  const paramsResult = authorParamsSchema.safeParse(request.params);
  if (!paramsResult.success) {
    log.error(CommonErrorMessages.INVALID_PARAMETERS);
    return reply.error({
      errorMessage: CommonErrorMessages.INVALID_PARAMETERS,
      details: paramsResult.error.errors,
    });
  }
  log.info("Validating body");
  const bodyResult = updateAuthorSchema.safeParse(request.body);
  if (!bodyResult.success) {
    log.error(CommonErrorMessages.VALIDATION_FAILED);
    return reply.error({
      errorMessage: CommonErrorMessages.VALIDATION_FAILED,
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
