// Loan相关类型定义

import type {Book} from '@/types/Book';
import type {User} from '@/types/User';
import type {Fine} from '@/types/Fine';

export interface Loan {
    updatedTime: string;
    id: number;
    loanDate: string;
    dueDate: string;
    returnDate?: string | null;
    bookId: number;
    book: Book;
    userId: number;
    user: User;
    fine: Fine;
    createdTime: string;
}

export interface LoanVO {
    title?: string | null;
    username?: string | null;
    loanDate: string;
    dueDate: string;
    returnDate: string;
}

export interface EditLoanDTO {
    bookId: number;
    userId: number;
    dueDate?: string;
}