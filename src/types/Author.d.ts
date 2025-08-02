// Author相关类型定义

// 引用Book类型，避免循环依赖
import type { Book } from '@/types/Book';

export interface Author {
  updatedTime: string;
  id: number;
  name: string;
  biography?: string | null;
  books?: Book[] | null;
  createdTime: string;
}

export interface EditAuthorDTO {
  name: string;
  biography?: string | null;
}