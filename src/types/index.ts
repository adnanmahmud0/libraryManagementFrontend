// types.ts
export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBooksApiResponse {
  success: boolean;
  message: string;
  data: IBook[]; // this is the actual books array
}

// 📦 Borrow Request Type
export interface IBorrow {
  book: string; // bookId
  quantity: number;
  dueDate: string; // ISO date string
}

// 📊 Borrow Summary Type (from aggregation)
export interface IBorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export interface BookFilterProps {
  filter: string;
  sortBy: string;
  sort: string;
  limit: number;
  onFilterChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onLimitChange: (value: number) => void;
}


export interface IBorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}