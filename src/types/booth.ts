export interface FetchBoothListParams {
  id: string;
  currentPage: number;
  isLastPage: boolean;
}

export interface BoothDepartment {
  id: string;
  name: string;
  categoryName: string;
}

export interface BoothList {
  simpleBooths: BoothInfo[];
  totalPage: number;
}

export interface BoothDetailInfo extends BoothInfo {
  location: string;
  createdAt: string;
  locationImageUrl: string;
  department: string;
}

export interface BoothInfo {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface BoothEditFields {
  name: string;
  description: string;
  location: string;
  file?: File;
}
export interface BoothEditData {
  name: string;
  description: string;
  location: string;
  imageUrl: string;
}

export interface BoothQrData {
  qrCode: string;
  department: string;
  fetchQr: () => Promise<void>;
}

export interface BottomSheetPropTypes {
  qrCode: string;
  isOpen: boolean;
  department: string;
  fetchQr: () => Promise<void>;
}

export interface Ownership {
  isOwner: boolean;
}
