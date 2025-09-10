import { FastifyReply, FastifyRequest } from "fastify";
import { ZodSchema } from "zod";
import { LoggerHelper } from "./logger-helper";
import { CommonErrorCode, CommonErrorMessage } from "../consts/error-messages";

export enum ValidationFor {
  BODY = "body",
  PARAMS = "params",
}

type ValidationForType = ValidationFor.BODY | ValidationFor.PARAMS;

type ValidateParamType<T> = {
  schema: ZodSchema<T>;
  type?: ValidationForType;
  logger?: LoggerHelper;
};

const validationCode = {
  [ValidationFor.BODY]: CommonErrorCode.VALIDATION_FAILED,
  [ValidationFor.PARAMS]: CommonErrorCode.INVALID_PARAMETERS,
};

export const validate =
  <T>({ schema, type = ValidationFor.BODY, logger }: ValidateParamType<T>) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    const log = logger && logger.log(request, validate.name);
    log && log.info(`Validating ${type}`);

    const target = type === ValidationFor.BODY ? request.body : request.params;
    const result = schema.safeParse(target);

    if (!result.success) {
      log && log.error(validationCode[type]);
      return reply.error({
        errorMessage: CommonErrorMessage[validationCode[type]],
        errorCode: validationCode[type],
        details: result.error.errors,
      });
    }

    if (type === ValidationFor.BODY) request.body = result.data;
    else request.params = result.data;
  };
