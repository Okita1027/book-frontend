// User相关类型定义

import type { Loan } from './Loan';
import type { Fine } from './Fine';

export enum UserRole {
  User = 0,
  Admin = 1
}

export interface User {
  updatedTime: string;
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  registrationDate: string;
  loans?: Loan[] | null;
  fines?: Fine[] | null;
  createdTime: string;
}

export interface EditUserDTO {
  name: string;
  email: string;
  passwordHash: string;
}