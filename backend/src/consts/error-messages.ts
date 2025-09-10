export enum CommonSchemaErrorMessage {
  INVALID_ID = "Invalid ID",
  INVALID_YEAR = "Invalid year",
}

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

export enum AuthorSchemaErrorMessage {
  NAME_REQUIRED = "Name is required",
  NAME_TOO_LONG = "Name too long",
  BIO_TOO_LONG = "Bio too long",
}

export enum AuthorErrorCode {
  NOT_FOUND = "AUTHOR_NOT_FOUND",
  ALREADY_EXISTS = "AUTHOR_ALREADY_EXISTS",
}

export const AuthorErrorMessage = {
  [AuthorErrorCode.NOT_FOUND]: "Author not found",
  [AuthorErrorCode.ALREADY_EXISTS]: "Author with this name already exists",
} as const;

export enum GenreSchemaErrorMessage {
  NAME_REQUIRED = "Name is required",
  NAME_TOO_LONG = "Name too long",
}

export enum GenreErrorCode {
  NOT_FOUND = "GENRE_NOT_FOUND",
  ALREADY_EXISTS = "GENRE_ALREADY_EXISTS",
  SOME_INVALID = "GENRE_IDS_INVALID",
}

export const GenreErrorMessage = {
  [GenreErrorCode.NOT_FOUND]: "Genre not found",
  [GenreErrorCode.ALREADY_EXISTS]: "Genre with this name already exists",
  [GenreErrorCode.SOME_INVALID]: "Some genre ids are invalid",
};

export enum BookSchemaErrorMessage {
  TITLE_REQUIRED = "Title is required",
  TITLE_TOO_LONG = "Title too long",
  AUTHOR_REQUIRED = "Author ID is required",
  PUBLISHED_YEAR_REQUIRED = "Published year is required",
  AUTHOR_ID_OR_AUTHOR_REQUIRED = "Either authorId or author must be provided",
}

export enum BookErrorCode {
  AUTHOR_ID_OR_AUTHOR_REQUIRED = "BOOK_AUTHOR_ID_OR_AUTHOR_REQUIRED",
  NOT_FOUND = "BOOK_NOT_FOUND",
}

export const BookErrorMessage = {
  [BookErrorCode.AUTHOR_ID_OR_AUTHOR_REQUIRED]:
    "Either authorId or author must be provided",
  [BookErrorCode.NOT_FOUND]: "Book not found",
};
