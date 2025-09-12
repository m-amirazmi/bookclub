import { Author, Book, Genre, PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// 1. Seed Genres (6)
// 2. Seed Authors (5)
// 3. Seed Books (5-7 per author)
// 4. Attach genres to book(2-3 genre per book)

const initialGenres: Pick<Genre, "name">[] = [
  { name: "Romance" },
  { name: "Fantasy" },
  { name: "Mystery" },
  { name: "Thrillers" },
  { name: "Young Adult" },
  { name: "Biography" },
  { name: "Education" },
];

const seedGenres = async () => {
  await db.bookGenre.deleteMany({});
  await db.genre.deleteMany({});
  await db.genre.createMany({ data: initialGenres });
};

const initialAuthors: Pick<Author, "name" | "bio">[] = [
  {
    name: "Jane Austen",
    bio: "English novelist known for her romantic fiction exploring the British landed gentry, including classics like Pride and Prejudice.",
  },
  {
    name: "J.K. Rowling",
    bio: "British author of the Harry Potter series, blending magic, adventure, and coming-of-age stories.",
  },
  {
    name: "Agatha Christie",
    bio: "British author famed for her detective novels, including Hercule Poirot and Miss Marple series.",
  },
  {
    name: "Dan Brown",
    bio: "American author of fast-paced thrillers like The Da Vinci Code, blending history, codes, and suspense.",
  },
  {
    name: "John Green",
    bio: "American writer of contemporary YA novels such as The Fault in Our Stars.",
  },
];

const seedAuthors = async () => {
  await db.book.deleteMany({});
  await db.author.deleteMany({});
  await db.author.createMany({ data: initialAuthors });
};

const initialBooks: Pick<
  Book,
  "authorId" | "publishedYear" | "title" | "description"
>[] = [];

const seed = async () => {
  await seedGenres();
  await seedAuthors();
};

seed();
