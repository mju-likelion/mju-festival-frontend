export interface NoticeType {
  id: string;
  title: string;
  content: string;
}

export interface DetailNoticeType {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  imageUrl: string;
}

export interface NoticeCardPropTypes {
  title: string;
  content: string;
}

type SortKey = 'asc' | 'desc';
export type SortOptions = Record<SortKey, string>;
