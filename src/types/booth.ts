export interface BoothDepartment {
  id: string;
  name: string;
  categoryName: string;
}

export interface BoothList {
  simpleBoothResponseList: BoothPreview[];
}
export interface BoothPreview {
  id: string;
  name: string;
  departmentName: string;
  imageUrl: string;
}
export interface BoothListObj {
  [key: string]: BoothPreview[];
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
