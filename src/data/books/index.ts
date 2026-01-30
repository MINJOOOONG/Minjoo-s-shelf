import { type1Books } from './type1';
import { type2Books } from './type2';
import { type3Books } from './type3';
import { type4Books } from './type4';

export interface Book {
  id: number;
  title: string;
  author: string;
  summary: string;
  coverImage: string;
  tags: string[];
  isbn?: string;
}

export const allBooks: Book[] = [
  ...type1Books,
  ...type2Books,
  ...type3Books,
  ...type4Books,
];

export const booksByType = {
  'introvert-planner': type1Books,
  'introvert-spontaneous': type2Books,
  'extrovert-planner': type3Books,
  'extrovert-spontaneous': type4Books,
};

export function getRandomBook(typeKey: string): Book {
  const books = booksByType[typeKey as keyof typeof booksByType] || type1Books;
  const randomIndex = Math.floor(Math.random() * books.length);
  return books[randomIndex];
}
