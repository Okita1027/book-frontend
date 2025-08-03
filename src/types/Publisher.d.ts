import { Publisher } from '@/types';
// Publisher相关类型定义

import type {Book} from '@/types/Book';

export interface Publisher {
    updatedTime: string;
    id: number;
    name: string;
    books?: Book[] | null;
    createdTime: string;
}

export interface EditPublisherDTO {
    name: string;
}
