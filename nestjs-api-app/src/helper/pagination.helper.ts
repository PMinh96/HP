// src/helpers/pagination.helper.ts

export interface PaginationOptions {
    page: number;
    limit: number;
  }
  
  export interface PaginationResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
  export function paginate<T>(
    items: T[],
    total: number,
    options: PaginationOptions
  ): PaginationResult<T> {
    const { page, limit } = options;
    const totalPages = Math.ceil(total / limit);
    
    return {
      data: items,
      total,
      page,
      limit,
      totalPages
    };
  }
  