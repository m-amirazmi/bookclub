import { Prisma } from "@prisma/client";

export type BookRepoResponse = Prisma.BookGetPayload<{
  include: {
    author: true;
    genres: { include: { genre: true } };
    readingProgress: true;
  };
}>;
