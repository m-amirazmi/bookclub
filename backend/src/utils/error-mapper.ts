// utils/error-mapper.ts
import { HttpStatus } from "../consts/http-status";
import {
  AuthorErrorCode,
  AuthorErrorMessage,
  CommonErrorCode,
  CommonErrorMessage,
} from "../consts/error-messages";
import { ErrorResponseParamType } from "../plugins/response.plugin";

export function mapErrorToResponse(error: unknown): ErrorResponseParamType {
  const defaultError: ErrorResponseParamType = {
    errorCode: CommonErrorCode.INTERNAL_SERVER_ERROR,
    errorMessage: CommonErrorMessage[CommonErrorCode.INTERNAL_SERVER_ERROR],
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  };

  if (!(error instanceof Error)) return defaultError;

  switch (error.message) {
    case AuthorErrorCode.NOT_FOUND:
      return {
        errorCode: AuthorErrorCode.NOT_FOUND,
        errorMessage: AuthorErrorMessage[AuthorErrorCode.NOT_FOUND],
        statusCode: HttpStatus.NOT_FOUND,
      };
    case AuthorErrorCode.ALREADY_EXISTS:
      return {
        errorCode: AuthorErrorCode.ALREADY_EXISTS,
        errorMessage: AuthorErrorMessage[AuthorErrorCode.ALREADY_EXISTS],
        statusCode: HttpStatus.CONFLICT,
      };
    default:
      return defaultError;
  }
}
