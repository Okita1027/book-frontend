// Fine相关类型定义

import type { Loan } from "@/types/Loan";
import type { User } from "@/types/User";

export interface Fine {
  updatedTime: string;
  id: number;
  amount: number;
  reason?: string | null;
  paidDate?: string | null;
  loanId: number;
  loan: Loan;
  userId: number;
  user: User;
  createdTime: string;
}

export interface FineVO {
  loadId: number;
  userId: number;
  username?: string | null;
  amount: number;
  reason?: string | null;
  paidDate: string;
  createdTime: string;
}
