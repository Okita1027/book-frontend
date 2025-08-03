// Auth相关类型定义

export interface AuthResponseDTO {
    token?: string | null;
    name?: string | null;
    role?: string | null;
    expiresAt: string;
}