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

// Helper to pick 2-3 random genres
function pickRandomGenres(genres: Pick<Genre, "name">[]): string[] {
  const shuffled = genres.sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * 2) + 2; // 2 or 3 genres
  return shuffled.slice(0, count).map((g) => g.name);
}

const initialBooks: (Pick<Book, "publishedYear" | "title" | "description"> & {
  genres: string[];
  readingProgress?: number;
  authorName: string;
})[] = [
  // Jane Austen
  {
    title: "Pride and Prejudice",
    authorName: "Jane Austen",
    publishedYear: 1813,
    description:
      "A classic romance about love, society, and misunderstandings in 19th-century England.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Sense and Sensibility",
    authorName: "Jane Austen",
    publishedYear: 1811,
    description:
      "The story of the Dashwood sisters navigating love, loss, and social expectations.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Emma",
    authorName: "Jane Austen",
    publishedYear: 1815,
    description:
      "A witty tale of matchmaking, self-discovery, and romantic entanglements.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Mansfield Park",
    authorName: "Jane Austen",
    publishedYear: 1814,
    description:
      "Follows Fanny Price as she grows up in a wealthy family, exploring morality and love.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Northanger Abbey",
    authorName: "Jane Austen",
    publishedYear: 1817,
    description:
      "A young woman’s coming-of-age story, mixing romance with satire of Gothic novels.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Persuasion",
    authorName: "Jane Austen",
    publishedYear: 1817,
    description:
      "A mature love story about second chances and enduring affection.",
    genres: pickRandomGenres(initialGenres),
  },

  // J.K. Rowling
  {
    title: "Harry Potter and the Sorcerer's Stone",
    authorName: "J.K. Rowling",
    publishedYear: 1997,
    description:
      "Harry discovers he is a wizard and begins his magical education at Hogwarts.",
    genres: pickRandomGenres(initialGenres),
    readingProgress: 75,
  },
  {
    title: "Harry Potter and the Chamber of Secrets",
    authorName: "J.K. Rowling",
    publishedYear: 1998,
    description:
      "Harry uncovers dark secrets hidden within Hogwarts and faces a mysterious creature.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    authorName: "J.K. Rowling",
    publishedYear: 1999,
    description:
      "Harry learns the truth about his past and confronts the dangerous escaped prisoner Sirius Black.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Harry Potter and the Goblet of Fire",
    authorName: "J.K. Rowling",
    publishedYear: 2000,
    description:
      "Harry competes in the perilous Triwizard Tournament while dark forces rise.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Harry Potter and the Order of the Phoenix",
    authorName: "J.K. Rowling",
    publishedYear: 2003,
    description:
      "Harry and friends form a secret group to defend against Voldemort’s growing power.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Harry Potter and the Half-Blood Prince",
    authorName: "J.K. Rowling",
    publishedYear: 2005,
    description:
      "Harry discovers secrets about Voldemort’s past and prepares for the final battle.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Harry Potter and the Deathly Hallows",
    authorName: "J.K. Rowling",
    publishedYear: 2007,
    description:
      "The epic conclusion as Harry and his friends confront Voldemort and end his reign of terror.",
    genres: pickRandomGenres(initialGenres),
  },

  // Agatha Christie
  {
    title: "Murder on the Orient Express",
    authorName: "Agatha Christie",
    publishedYear: 1934,
    description:
      "Detective Hercule Poirot solves a murder case aboard a luxurious train.",
    genres: pickRandomGenres(initialGenres),
    readingProgress: 35,
  },
  {
    title: "And Then There Were None",
    authorName: "Agatha Christie",
    publishedYear: 1939,
    description:
      "Ten strangers are lured to an isolated island where they are killed one by one.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "The Murder of Roger Ackroyd",
    authorName: "Agatha Christie",
    publishedYear: 1926,
    description:
      "Poirot investigates the shocking murder of a wealthy man in a quiet village.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Death on the Nile",
    authorName: "Agatha Christie",
    publishedYear: 1937,
    description:
      "A luxurious cruise turns deadly, and Poirot must solve the murder aboard a riverboat.",
    genres: pickRandomGenres(initialGenres),
    readingProgress: 100,
  },
  {
    title: "The A.B.C. Murders",
    authorName: "Agatha Christie",
    publishedYear: 1936,
    description:
      "Poirot faces a mysterious serial killer who follows an alphabetical pattern.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "The Mysterious Affair at Styles",
    authorName: "Agatha Christie",
    publishedYear: 1920,
    description:
      "Poirot investigates his first case, unraveling a cunning murder plot in an English manor.",
    genres: pickRandomGenres(initialGenres),
  },

  // Dan Brown
  {
    title: "The Da Vinci Code",
    authorName: "Dan Brown",
    publishedYear: 2003,
    description:
      "A symbologist unravels a conspiracy hidden within famous artworks.",
    genres: pickRandomGenres(initialGenres),
    readingProgress: 55,
  },
  {
    title: "Angels & Demons",
    authorName: "Dan Brown",
    publishedYear: 2000,
    description:
      "A secret society threatens the Vatican, and a symbologist races to prevent disaster.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Inferno",
    authorName: "Dan Brown",
    publishedYear: 2013,
    description:
      "A deadly plague forces a thrilling quest through Dante’s works and Florence.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Origin",
    authorName: "Dan Brown",
    publishedYear: 2017,
    description:
      "A futuristic mystery explores science, religion, and humanity’s origin.",
    genres: pickRandomGenres(initialGenres),
    readingProgress: 10,
  },
  {
    title: "Digital Fortress",
    authorName: "Dan Brown",
    publishedYear: 1998,
    description:
      "A cryptographer races to stop a powerful government code-breaking threat.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Deception Point",
    authorName: "Dan Brown",
    publishedYear: 2001,
    description:
      "A NASA discovery hides a deadly conspiracy threatening the world.",
    genres: pickRandomGenres(initialGenres),
  },

  // John Green
  {
    title: "The Fault in Our Stars",
    authorName: "John Green",
    publishedYear: 2012,
    description:
      "Teenagers with cancer navigate love, life, and loss in a poignant story.",
    genres: pickRandomGenres(initialGenres),
    readingProgress: 0,
  },
  {
    title: "Looking for Alaska",
    authorName: "John Green",
    publishedYear: 2005,
    description:
      "A boarding school student searches for meaning and copes with tragedy.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Paper Towns",
    authorName: "John Green",
    publishedYear: 2008,
    description:
      "A teenager follows clues to find a missing friend and discovers hidden truths.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Turtles All the Way Down",
    authorName: "John Green",
    publishedYear: 2017,
    description:
      "A young girl struggles with mental illness while investigating a billionaire’s disappearance.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "An Abundance of Katherines",
    authorName: "John Green",
    publishedYear: 2006,
    description:
      "A prodigy searches for love formulas after numerous failed relationships.",
    genres: pickRandomGenres(initialGenres),
  },
  {
    title: "Let It Snow",
    authorName: "John Green",
    publishedYear: 2008,
    description:
      "A holiday-themed collection of intertwined teen romance stories.",
    genres: pickRandomGenres(initialGenres),
  },
];

const seedBooks = async () => {
  Promise.all(
    initialBooks.map(async (book) => {
      const { genres, authorName, ...rest } = book;
      const author = await db.author.findUnique({
        where: { name: authorName },
      });
      if (!author) return;
      const bookCreated = await db.book.create({
        data: {
          ...rest,
          authorId: author?.id,
        },
      });

      const bookGenres = await Promise.all(
        genres.map(async (genreName) => {
          const genre = await db.genre.findUnique({
            where: { name: genreName },
          });
          if (!genre) return null;
          return { bookId: bookCreated.id, genreId: genre.id };
        })
      );

      const validBookGenres = bookGenres.filter(
        (relation): relation is { bookId: number; genreId: number } =>
          relation !== null
      );

      await db.bookGenre.createMany({
        data: validBookGenres,
        skipDuplicates: true,
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
