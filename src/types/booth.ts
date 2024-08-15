export interface BoothList {
  simpleBooths: Booth[];
  totalPage: number;
}

export interface Booth {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
}
