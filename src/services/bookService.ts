// Book（图书）相关API服务
import { apiClient } from "@/services/api";
import type { BookVO, EditBookDTO, RawBook } from "@/types";

export interface BookSearchParams {
  title?: string;
  isbn?: string;
  authorName?: string;
  categoryName?: string;
  publisherName?: string;
  publishedDateBegin?: string;
  publishedDateEnd?: string;
}

export const bookService = {
  // 获取所有图书
  getAll: (): Promise<BookVO[]> => {
    return apiClient.get("/Books");
  },

  // 获取原始图书数据（包含ID和名称）
  getRawBooks: (): Promise<RawBook[]> => {
    return apiClient.get("/RawBooks");
  },

  // 根据ID获取图书
  getById: (id: number): Promise<BookVO> => {
    return apiClient.get(`/Books/${id}`);
  },

  // 搜索图书
  search: (params: BookSearchParams): Promise<BookVO[]> => {
    return apiClient.get("/Books/search", { params });
  },

  // 添加图书
  add: (data: EditBookDTO): Promise<void> => {
    return apiClient.post("/Books/add", data);
  },

  // 更新图书
  update: (id: number, data: EditBookDTO): Promise<void> => {
    return apiClient.put(`/Books/${id}`, data);
  },

  // 删除单个图书
  delete: (id: number): Promise<void> => {
    return apiClient.delete(`/Books/${id}`);
  },

  // 批量删除图书
  batchDelete: (ids: number[]): Promise<void> => {
    return apiClient.delete("/Books", { data: ids });
  },
};
