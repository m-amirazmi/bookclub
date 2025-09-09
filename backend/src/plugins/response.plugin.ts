import { FastifyReply } from "fastify";
import fp from "fastify-plugin";
import { ZodIssue } from "zod";

type SuccessResponseParamType<T> = {
  statusCode: number;
  data: T;
  message?: string;
};

export interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

type ErrorResponseParamType = {
  statusCode: number;
  errorMessage: string;
  details?: ZodIssue[];
};

export interface ErrorResponse {
  success: false;
  errorMessage: string;
  statusCode?: number;
  details?: any;
}

export const responsePlugin = fp(async (server) => {
  server.decorateReply("success", function <
    T
  >(this: FastifyReply, options: SuccessResponseParamType<T>) {
    const response: SuccessResponse<T> = {
      data: options.data,
      success: true,
      ...(options.message && { message: options.message }),
    };
    return this.code(options.statusCode).send(response);
  });

  server.decorateReply("error", function <
    T
  >(this: FastifyReply, options: ErrorResponseParamType) {
    const response: ErrorResponse = {
      errorMessage: options.errorMessage,
      success: false,
      statusCode: options.statusCode,
      ...(options.details && { details: options.details }),
    };
    return this.code(options.statusCode).send(response);
  });
});

// Extend FastifyReply type
declare module "fastify" {
  interface FastifyReply {
    success<T>(options: SuccessResponseParamType<T>): FastifyReply;
    error(options: ErrorResponseParamType): FastifyReply;
  }
}
