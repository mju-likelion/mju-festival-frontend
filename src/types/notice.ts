import { ReactNode } from 'react';

export interface NoticeType {
  id?: string;
  title: string;
  content: string;
}

export interface ImageNoticeType extends NoticeType {
  imageUrl?: string;
}

export interface DetailNoticeType extends ImageNoticeType {
  createdAt: Date;
}

export type SimpleNotice = Omit<DetailNoticeType, 'imageUrl'>;

export interface NoticeCardPropType extends Omit<NoticeType, 'id'> {
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export interface GetNoticesType {
  simpleAnnouncements: SimpleNotice[];
  totalPage: number;
}

export type SortKey = 'asc' | 'desc';
export type SortOptions = Record<SortKey, string>;
export interface DeleteNoticeModalProps {
  noticeId?: string;
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}

export interface UseFetchNoticesProps {
  isSorted: string;
  page: number;
}
