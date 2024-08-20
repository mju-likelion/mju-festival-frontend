export interface SimpleLostItem {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  isFounded: boolean;
}

export interface ResponseLostItem {
  simpleLostItems: SimpleLostItem[];
  totalPage: number;
}

export type SortKey = 'asc' | 'desc';
export type SortOptions = Record<SortKey, string>;
