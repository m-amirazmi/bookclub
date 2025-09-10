// utils/error-mapper.ts
import { HttpStatus } from "../consts/http-status";
import {
  AuthorErrorCode,
  AuthorErrorMessage,
  BookErrorCode,
  BookErrorMessage,
  CommonErrorCode,
  CommonErrorMessage,
  GenreErrorCode,
  GenreErrorMessage,
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

    case GenreErrorCode.NOT_FOUND:
      return {
        errorCode: GenreErrorCode.NOT_FOUND,
        errorMessage: GenreErrorMessage[GenreErrorCode.NOT_FOUND],
        statusCode: HttpStatus.NOT_FOUND,
      };

    case GenreErrorCode.ALREADY_EXISTS:
      return {
        errorCode: GenreErrorCode.ALREADY_EXISTS,
        errorMessage: GenreErrorMessage[GenreErrorCode.ALREADY_EXISTS],
        statusCode: HttpStatus.CONFLICT,
      };

    case GenreErrorCode.SOME_INVALID:
      return {
        errorCode: GenreErrorCode.SOME_INVALID,
        errorMessage: GenreErrorMessage[GenreErrorCode.SOME_INVALID],
        statusCode: HttpStatus.BAD_REQUEST,
      };

    case BookErrorCode.NOT_FOUND:
      return {
        errorCode: BookErrorCode.NOT_FOUND,
        errorMessage: BookErrorMessage[BookErrorCode.NOT_FOUND],
        statusCode: HttpStatus.NOT_FOUND,
      };

    case BookErrorCode.AUTHOR_ID_OR_AUTHOR_REQUIRED:
      return {
        errorCode: BookErrorCode.AUTHOR_ID_OR_AUTHOR_REQUIRED,
        errorMessage:
          BookErrorMessage[BookErrorCode.AUTHOR_ID_OR_AUTHOR_REQUIRED],
        statusCode: HttpStatus.CONFLICT,
      };

    default:
      return defaultError;
  }
}
