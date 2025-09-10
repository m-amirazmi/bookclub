import { z } from "zod";
import {
  CommonSchemaErrorMessage,
  GenreSchemaErrorMessage,
} from "../../../consts/error-messages";

export const createGenreSchema = z.object({
  name: z
    .string({ required_error: GenreSchemaErrorMessage.NAME_REQUIRED })
    .max(255, GenreSchemaErrorMessage.NAME_TOO_LONG),
});

export const updateGenreSchema = createGenreSchema.partial();

export const genreParamsSchema = z.object({
  id: z.coerce
    .number({ invalid_type_error: CommonSchemaErrorMessage.INVALID_ID })
    .int()
    .positive(),
});

// Type exports
export type CreateGenre = z.infer<typeof createGenreSchema>;
export type UpdateGenre = z.infer<typeof updateGenreSchema>;
export type GenreParams = z.infer<typeof genreParamsSchema>;
