// Category相关类型定义

import type {Book} from '@/types/Book';

export interface Category {
    updatedTime: string;
    id: number;
    name: string;
    bookCategories?: BookCategory[] | null;
    createdTime: string;
}

export interface BookCategory {
    updatedTime: string;
    bookId: number;
    book: Book;
    categoryId: number;
    category: Category;
    createdTime: string;
}

export interface EditCategoryDTO {
    name: string;
}