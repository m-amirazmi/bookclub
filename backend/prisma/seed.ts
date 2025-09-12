import { Author, Book, Genre, PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// 1. Seed Genres (6)
// 2. Seed Authors (5)
// 3. Seed Books (5-7 per author)
// 4. Attach genres to book(2-3 genre per book)

const initialGenres: Pick<Genre, "name" | "id">[] = [
  { name: "Romance", id: 1 },
  { name: "Fantasy", id: 2 },
  { name: "Mystery", id: 3 },
  { name: "Thrillers", id: 4 },
  { name: "Young Adult", id: 5 },
  { name: "Biography", id: 6 },
  { name: "Education", id: 7 },
];

const seedGenres = async () => {
  await db.bookGenre.deleteMany({});
  await db.genre.deleteMany({});
  await db.genre.createMany({ data: initialGenres });
};

const initialAuthors: Pick<Author, "name" | "bio" | "id">[] = [
  {
    id: 1,
    name: "Jane Austen",
    bio: "English novelist known for her romantic fiction exploring the British landed gentry, including classics like Pride and Prejudice.",
  },
  {
    id: 2,
    name: "J.K. Rowling",
    bio: "British author of the Harry Potter series, blending magic, adventure, and coming-of-age stories.",
  },
  {
    id: 3,
    name: "Agatha Christie",
    bio: "British author famed for her detective novels, including Hercule Poirot and Miss Marple series.",
  },
  {
    id: 4,
    name: "Dan Brown",
    bio: "American author of fast-paced thrillers like The Da Vinci Code, blending history, codes, and suspense.",
  },
  {
    id: 5,
    name: "John Green",
    bio: "American writer of contemporary YA novels such as The Fault in Our Stars.",
  },
];

const seedAuthors = async () => {
  await db.book.deleteMany({});
  await db.author.deleteMany({});
  await db.author.createMany({ data: initialAuthors });
};

// Helper to pick 2-3 random genres
function pickRandomGenres(genres: Pick<Genre, "name" | "id">[]): number[] {
  const shuffled = genres.sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * 2) + 2; // 2 or 3 genres
  return shuffled.slice(0, count).map((g) => g.id);
}

const initialBooks: (Pick<
  Book,
  "id" | "authorId" | "publishedYear" | "title" | "description"
> & { genres: number[]; readingProgress?: number })[] = [
  // Jane Austen
  {
    id: 1,
    title: "Pride and Prejudice",
    authorId: 1,
    publishedYear: 1813,
    description:
      "A classic romance about love, society, and misunderstandings in 19th-century England.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 2,
    title: "Sense and Sensibility",
    authorId: 1,
    publishedYear: 1811,
    description:
      "The story of the Dashwood sisters navigating love, loss, and social expectations.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 3,
    title: "Emma",
    authorId: 1,
    publishedYear: 1815,
    description:
      "A witty tale of matchmaking, self-discovery, and romantic entanglements.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 4,
    title: "Mansfield Park",
    authorId: 1,
    publishedYear: 1814,
    description:
      "Follows Fanny Price as she grows up in a wealthy family, exploring morality and love.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 5,
    title: "Northanger Abbey",
    authorId: 1,
    publishedYear: 1817,
    description:
      "A young woman’s coming-of-age story, mixing romance with satire of Gothic novels.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 6,
    title: "Persuasion",
    authorId: 1,
    publishedYear: 1817,
    description:
      "A mature love story about second chances and enduring affection.",
    genres: pickRandomGenres(initialGenres),
  },

  // J.K. Rowling
  {
    id: 7,
    title: "Harry Potter and the Sorcerer's Stone",
    authorId: 2,
    publishedYear: 1997,
    description:
      "Harry discovers he is a wizard and begins his magical education at Hogwarts.",
    genres: pickRandomGenres(initialGenres),
    readingProgress: 75,
  },
  {
    id: 8,
    title: "Harry Potter and the Chamber of Secrets",
    authorId: 2,
    publishedYear: 1998,
    description:
      "Harry uncovers dark secrets hidden within Hogwarts and faces a mysterious creature.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 9,
    title: "Harry Potter and the Prisoner of Azkaban",
    authorId: 2,
    publishedYear: 1999,
    description:
      "Harry learns the truth about his past and confronts the dangerous escaped prisoner Sirius Black.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 10,
    title: "Harry Potter and the Goblet of Fire",
    authorId: 2,
    publishedYear: 2000,
    description:
      "Harry competes in the perilous Triwizard Tournament while dark forces rise.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 11,
    title: "Harry Potter and the Order of the Phoenix",
    authorId: 2,
    publishedYear: 2003,
    description:
      "Harry and friends form a secret group to defend against Voldemort’s growing power.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 12,
    title: "Harry Potter and the Half-Blood Prince",
    authorId: 2,
    publishedYear: 2005,
    description:
      "Harry discovers secrets about Voldemort’s past and prepares for the final battle.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 13,
    title: "Harry Potter and the Deathly Hallows",
    authorId: 2,
    publishedYear: 2007,
    description:
      "The epic conclusion as Harry and his friends confront Voldemort and end his reign of terror.",
    genres: pickRandomGenres(initialGenres),
  },

  // Agatha Christie
  {
    id: 14,
    title: "Murder on the Orient Express",
    authorId: 3,
    publishedYear: 1934,
    description:
      "Detective Hercule Poirot solves a murder case aboard a luxurious train.",
    genres: pickRandomGenres(initialGenres),
    readingProgress: 35,
  },
  {
    id: 15,
    title: "And Then There Were None",
    authorId: 3,
    publishedYear: 1939,
    description:
      "Ten strangers are lured to an isolated island where they are killed one by one.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 16,
    title: "The Murder of Roger Ackroyd",
    authorId: 3,
    publishedYear: 1926,
    description:
      "Poirot investigates the shocking murder of a wealthy man in a quiet village.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 17,
    title: "Death on the Nile",
    authorId: 3,
    publishedYear: 1937,
    description:
      "A luxurious cruise turns deadly, and Poirot must solve the murder aboard a riverboat.",
    genres: pickRandomGenres(initialGenres),
    readingProgress: 100,
  },
  {
    id: 18,
    title: "The A.B.C. Murders",
    authorId: 3,
    publishedYear: 1936,
    description:
      "Poirot faces a mysterious serial killer who follows an alphabetical pattern.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 19,
    title: "The Mysterious Affair at Styles",
    authorId: 3,
    publishedYear: 1920,
    description:
      "Poirot investigates his first case, unraveling a cunning murder plot in an English manor.",
    genres: pickRandomGenres(initialGenres),
  },

  // Dan Brown
  {
    id: 20,
    title: "The Da Vinci Code",
    authorId: 4,
    publishedYear: 2003,
    description:
      "A symbologist unravels a conspiracy hidden within famous artworks.",
    genres: pickRandomGenres(initialGenres),
    readingProgress: 55,
  },
  {
    id: 21,
    title: "Angels & Demons",
    authorId: 4,
    publishedYear: 2000,
    description:
      "A secret society threatens the Vatican, and a symbologist races to prevent disaster.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 22,
    title: "Inferno",
    authorId: 4,
    publishedYear: 2013,
    description:
      "A deadly plague forces a thrilling quest through Dante’s works and Florence.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 23,
    title: "Origin",
    authorId: 4,
    publishedYear: 2017,
    description:
      "A futuristic mystery explores science, religion, and humanity’s origin.",
    genres: pickRandomGenres(initialGenres),
    readingProgress: 10,
  },
  {
    id: 24,
    title: "Digital Fortress",
    authorId: 4,
    publishedYear: 1998,
    description:
      "A cryptographer races to stop a powerful government code-breaking threat.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 25,
    title: "Deception Point",
    authorId: 4,
    publishedYear: 2001,
    description:
      "A NASA discovery hides a deadly conspiracy threatening the world.",
    genres: pickRandomGenres(initialGenres),
  },

  // John Green
  {
    id: 26,
    title: "The Fault in Our Stars",
    authorId: 5,
    publishedYear: 2012,
    description:
      "Teenagers with cancer navigate love, life, and loss in a poignant story.",
    genres: pickRandomGenres(initialGenres),
    readingProgress: 0,
  },
  {
    id: 27,
    title: "Looking for Alaska",
    authorId: 5,
    publishedYear: 2005,
    description:
      "A boarding school student searches for meaning and copes with tragedy.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 28,
    title: "Paper Towns",
    authorId: 5,
    publishedYear: 2008,
    description:
      "A teenager follows clues to find a missing friend and discovers hidden truths.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 29,
    title: "Turtles All the Way Down",
    authorId: 5,
    publishedYear: 2017,
    description:
      "A young girl struggles with mental illness while investigating a billionaire’s disappearance.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 30,
    title: "An Abundance of Katherines",
    authorId: 5,
    publishedYear: 2006,
    description:
      "A prodigy searches for love formulas after numerous failed relationships.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    id: 31,
    title: "Let It Snow",
    authorId: 5,
    publishedYear: 2008,
    description:
      "A holiday-themed collection of intertwined teen romance stories.",
    genres: pickRandomGenres(initialGenres),
  },
];

const seedBooks = async () => {
  Promise.all(
    initialBooks.map(async (book) => {
      const { genres, authorId, ...rest } = book;
      const bookCreated = await db.book.create({
        data: {
          ...rest,
          authorId,
        },
      });
      const genreGroup = genres.map((id) => ({
        bookId: bookCreated.id,
        genreId: id,
      }));
      await db.bookGenre.createMany({
        data: genreGroup,
      });
    })
  );
};

const seed = async () => {
  await seedGenres();
  await seedAuthors();
  await seedBooks();
};

seed();
