export interface Author {
  id: number
  name: string
  bio: string
}

export interface Genre {
  id: number
  name: string
}

export interface Book {
  id: number
  title: string
  publishedYear: number
  description?: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
  author: Author
  genres: Array<Genre>
  readingProgress?: number
}

export interface Response {
  success: string
}

export interface BooksResponse extends Response {
  data: Array<Book>
}

export interface BookResponse extends Response {
  data: Book
}
