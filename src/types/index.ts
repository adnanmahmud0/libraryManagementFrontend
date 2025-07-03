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
