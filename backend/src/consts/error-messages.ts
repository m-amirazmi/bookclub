export enum AuthorErrorCode {
  AUTHOR_NOT_FOUND = "AUTHOR_NOT_FOUND",
  AUTHOR_ALREADY_EXISTS = "AUTHOR_ALREADY_EXISTS",
}

export const AuthorErrorMessage = {
  [AuthorErrorCode.AUTHOR_NOT_FOUND]: "Author not found",
  [AuthorErrorCode.AUTHOR_ALREADY_EXISTS]:
    "Author with this name already exists",
} as const;

export enum CommonErrorCode {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  INVALID_PARAMETERS = "INVALID_PARAMETERS",
  VALIDATION_FAILED = "VALIDATION_FAILED",
}
export const CommonErrorMessage = {
  [CommonErrorCode.INTERNAL_SERVER_ERROR]: "Internal server error",
  [CommonErrorCode.INVALID_PARAMETERS]: "Invalid parameters",
  [CommonErrorCode.VALIDATION_FAILED]: "Validation failed",
} as const;

export enum SchemaError {}
