import { z } from "zod";

export const createAuthorSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name too long"),
  bio: z.string().max(1000, "Bio too long").optional(),
});

export const updateAuthorSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name too long")
    .optional(),
  bio: z.string().max(1000, "Bio too long").optional(),
});

export const authorParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format"),
});

// Type exports
export type CreateAuthor = z.infer<typeof createAuthorSchema>;
export type UpdateAuthor = z.infer<typeof updateAuthorSchema>;
export type AuthorParams = z.infer<typeof authorParamsSchema>;
