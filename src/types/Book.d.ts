// Book相关类型定义

import type { Author } from "@/types/Author";
import type { Publisher } from "@/types/Publisher";
import type { BookCategory } from "@/types/Category";
import type { Loan } from "@/types/Loan";

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
