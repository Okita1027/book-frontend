// Book相关类型定义

import type { Author } from './Author';
import type { Publisher } from './Publisher';
import type { BookCategory } from './Category';
import type { Loan } from './Loan';

export interface Book {
  updatedTime: string;
  id: number;
  title: string;
  isbn: string;
  publishedDate: string;
  stock: number;
  available: number;
  authorId: number;
  publisherId: number;
  author: Author;
  publisher: Publisher;
  bookCategories?: BookCategory[] | null;
  loans?: Loan[] | null;
  createdTime: string;
}

export interface BookVO {
  id: number;
  title?: string | null;
  isbn?: string | null;
  publishedDate: string;
  stock: number;
  available: number;
  authorName?: string | null;
  publisherName?: string | null;
  categoryNames?: string[] | null;
}

export interface EditBookDTO {
  title: string;
  isbn: string;
  publishedDate?: string;
  stock?: number;
  available?: number;
  authorId: number;
  publisherId: number;
  categoryIds: number[];
}