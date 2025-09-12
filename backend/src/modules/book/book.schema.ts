import { z } from "zod";
import {
  AuthorSchemaErrorMessage,
  BookSchemaErrorMessage,
  CommonSchemaErrorMessage,
  GenreSchemaErrorMessage,
} from "../../consts/error-messages";

const baseBookSchema = z.object({
  title: z
    .string({ required_error: BookSchemaErrorMessage.TITLE_REQUIRED })
    .max(255, BookSchemaErrorMessage.TITLE_TOO_LONG),
  description: z.string().optional(),
  authorId: z.coerce
    .number({
      invalid_type_error: CommonSchemaErrorMessage.INVALID_ID,
    })
    .int()
    .positive(CommonSchemaErrorMessage.INVALID_ID)
    .optional(),
  author: z
    .object({
      name: z
        .string({ required_error: AuthorSchemaErrorMessage.NAME_REQUIRED })
        .max(255, AuthorSchemaErrorMessage.NAME_TOO_LONG),
      bio: z
        .string()
        .max(1000, AuthorSchemaErrorMessage.BIO_TOO_LONG)
        .optional(),
    })
    .optional(),
  publishedYear: z.coerce
    .number({
      required_error: BookSchemaErrorMessage.PUBLISHED_YEAR_REQUIRED,
      invalid_type_error: CommonSchemaErrorMessage.INVALID_YEAR,
    })
    .int()
    .min(1000, CommonSchemaErrorMessage.INVALID_YEAR)
    .max(new Date().getFullYear(), CommonSchemaErrorMessage.INVALID_YEAR),
  genreIds: z
    .array(
      z.coerce
        .number({
          invalid_type_error: CommonSchemaErrorMessage.INVALID_ID,
        })
        .int()
        .positive(CommonSchemaErrorMessage.INVALID_ID)
    )
    .optional(),
  genres: z
    .array(
      z.object({
        name: z
          .string({ required_error: GenreSchemaErrorMessage.NAME_REQUIRED })
          .max(255, GenreSchemaErrorMessage.NAME_TOO_LONG),
      })
    )
    .optional(),
});

export const createBookSchema = baseBookSchema.refine(
  ({ author, authorId }) => author || authorId,
  {
    message: BookSchemaErrorMessage.AUTHOR_ID_OR_AUTHOR_REQUIRED,
    path: ["authorId", "author"],
  }
);

export const updateBookSchema = baseBookSchema
  .partial()
  .refine(({ author, authorId }) => author || authorId, {
    message: BookSchemaErrorMessage.AUTHOR_ID_OR_AUTHOR_REQUIRED,
    path: ["authorId", "author"],
  });

export const bookParamsSchema = z.object({
  id: z.coerce
    .number({ invalid_type_error: CommonSchemaErrorMessage.INVALID_ID })
    .int()
    .positive(),
});

// export const bookResponseSchema = z.object({
//   id: z.number(),
//   title: z.string(),
//   publishedYear: z.number(),
//   author: z
//     .object({ id: z.number(), name: z.string(), bio: z.string().nullable() })
//     .nullable(),
//   genres: z.array(z.object({ id: z.number(), name: z.string() })),
//   readingProgress: z.any().nullable(),
// });

// export const bookManyResponseSchema = z.array(baseBookSchema);

export type CreateBook = z.infer<typeof createBookSchema>;
export type UpdateBook = z.infer<typeof updateBookSchema>;
export type BookParams = z.infer<typeof bookParamsSchema>;
// export type BookResponse = z.infer<typeof bookResponseSchema>;
