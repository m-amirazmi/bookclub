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
    case AuthorErrorCode.AUTHOR_NOT_FOUND:
      return {
        errorCode: AuthorErrorCode.AUTHOR_NOT_FOUND,
        errorMessage: AuthorErrorMessage[AuthorErrorCode.AUTHOR_NOT_FOUND],
        statusCode: HttpStatus.NOT_FOUND,
      };
    case AuthorErrorCode.AUTHOR_ALREADY_EXISTS:
      return {
        errorCode: AuthorErrorCode.AUTHOR_ALREADY_EXISTS,
        errorMessage: AuthorErrorMessage[AuthorErrorCode.AUTHOR_ALREADY_EXISTS],
        statusCode: HttpStatus.CONFLICT,
      };
    default:
      return defaultError;
  }
}
