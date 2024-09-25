export interface BoothDepartment {
  id: string;
  name: string;
  categoryName: string;
}

export interface BoothPreview {
  id: string;
  name: string;
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
}

export interface BottomSheetPropTypes {
  qrCode: string;
  isOpen: boolean;
}

export interface Ownership {
  isOwner: boolean;
}
