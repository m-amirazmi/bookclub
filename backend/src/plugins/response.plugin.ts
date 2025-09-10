import { FastifyReply } from "fastify";
import fp from "fastify-plugin";
import { ZodIssue } from "zod";
import { HttpStatus } from "../consts/http-status";

type SuccessResponseParamType<T> = {
  statusCode?: HttpStatus;
  data: T;
  message?: string;
};

export interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export type ErrorResponseParamType = {
  statusCode?: HttpStatus;
  errorMessage: string;
  details?: ZodIssue[];
};

export interface ErrorResponse {
  success: false;
  errorMessage: string;
  statusCode?: HttpStatus;
  details?: any;
}

export const responsePlugin = fp(async (server) => {
  server.decorateReply("success", function <
    T
  >(this: FastifyReply, options: SuccessResponseParamType<T>) {
    const { data, statusCode = 200, message } = options;
    const response: SuccessResponse<T> = {
      data,
      success: true,
      ...(message && { message }),
    };
    return this.code(statusCode).send(response);
  });

  server.decorateReply("error", function <
    T
  >(this: FastifyReply, options: ErrorResponseParamType) {
    const { errorMessage, statusCode = 400, details } = options;
    const response: ErrorResponse = {
      errorMessage,
      success: false,
      statusCode: statusCode,
      ...(details && { details }),
    };
    return this.code(statusCode).send(response);
  });
});

// Extend FastifyReply type
declare module "fastify" {
  interface FastifyReply {
    success<T>(options: SuccessResponseParamType<T>): FastifyReply;
    error(options: ErrorResponseParamType): FastifyReply;
  }
}
