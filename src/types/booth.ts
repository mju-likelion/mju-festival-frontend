export interface BoothList {
  simpleBooths: BoothInfo[];
  totalPage: number;
}

export interface BoothDetailInfo extends BoothInfo {
  location: string;
  createdAt: string;
}

export interface BoothInfo {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface BoothQrData {
  qrCode: string;
}

export type BottomSheetPropTypes = BoothQrData;
