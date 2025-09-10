import { z } from "zod";
import {
  BookSchemaErrorMessage,
  CommonSchemaErrorMessage,
} from "../../consts/error-messages";

export const createBookSchema = z.object({
  title: z
    .string({ required_error: BookSchemaErrorMessage.TITLE_REQUIRED })
    .max(255, BookSchemaErrorMessage.TITLE_TOO_LONG),
  authorId: z.coerce
    .number({
      required_error: BookSchemaErrorMessage.AUTHOR_REQUIRED,
      invalid_type_error: CommonSchemaErrorMessage.INVALID_ID,
    })
    .int()
    .positive(CommonSchemaErrorMessage.INVALID_ID),
  publishedYear: z.coerce
    .number({
      required_error: BookSchemaErrorMessage.PUBLISHED_YEAR_REQUIRED,
      invalid_type_error: CommonSchemaErrorMessage.INVALID_YEAR,
    })
    .int()
    .min(1000, CommonSchemaErrorMessage.INVALID_YEAR)
    .max(new Date().getFullYear(), CommonSchemaErrorMessage.INVALID_YEAR),
  genres: z
    .array(
      z.coerce
        .number({
          invalid_type_error: CommonSchemaErrorMessage.INVALID_ID,
        })
        .int()
        .positive(CommonSchemaErrorMessage.INVALID_ID)
    )
    .optional(),
});

export const updateBookSchema = createBookSchema.partial();

export const bookParamsSchema = z.object({
  id: z.coerce
    .number({ invalid_type_error: CommonSchemaErrorMessage.INVALID_ID })
    .int()
    .positive(),
});

// Type exports
export type CreateBook = z.infer<typeof createBookSchema>;
export type UpdateBook = z.infer<typeof updateBookSchema>;
export type BookParams = z.infer<typeof bookParamsSchema>;
