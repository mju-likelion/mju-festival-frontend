export interface SimpleLostItem {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  isFounded: boolean;
}

export interface GetLostItemResponse {
  simpleLostItems: SimpleLostItem[];
  totalPage: number;
}

export interface PostLostItemRequest {
  title: string;
  content: string;
  imageUrl: string;
}

export interface LostItemForm {
  title: string;
  content: string;
  file?: File;
}

export type SortKey = 'asc' | 'desc';
export type SortOptions = Record<SortKey, string>;
