// User相关类型定义

import type {Loan} from '@/types/Loan';
import type {Fine} from '@/types/Fine';

const enum UserRole {
    Member = "Member",
    Admin = "Admin"
}

export interface User {
    updatedTime: string;
    id: number;
    name: string;
    email: string;
    phone?: string;
    passwordHash: string;
    role: UserRole;
    registrationDate: string;
    loans?: Loan[] | null;
    fines?: Fine[] | null;
    createdTime: string;
}

export interface UserLoginDTO {
    email: string;
    password: string;
}

export interface EditUserDTO {
    name: string;
    email: string;
    phone?: string;
    passwordHash?: string;
}