import { z } from "zod";
import {
  AuthorSchemaErrorMessage,
  CommonSchemaErrorMessage,
} from "../../consts/error-messages";

export const createAuthorSchema = z.object({
  name: z
    .string({ required_error: AuthorSchemaErrorMessage.NAME_REQUIRED })
    .max(255, AuthorSchemaErrorMessage.NAME_TOO_LONG),
  bio: z.string().max(1000, AuthorSchemaErrorMessage.BIO_TOO_LONG).optional(),
});

export const updateAuthorSchema = createAuthorSchema.partial();

export const authorParamsSchema = z.object({
  id: z.coerce
    .number({ invalid_type_error: CommonSchemaErrorMessage.INVALID_ID })
    .int()
    .positive(),
});

// Type exports
export type CreateAuthor = z.infer<typeof createAuthorSchema>;
export type UpdateAuthor = z.infer<typeof updateAuthorSchema>;
export type AuthorParams = z.infer<typeof authorParamsSchema>;
