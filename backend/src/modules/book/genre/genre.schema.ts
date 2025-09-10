import { Genre } from "@prisma/client";
import { z } from "zod";

export const createGenreSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name too long"),
});

export const updateGenreSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name too long")
    .optional(),
});
