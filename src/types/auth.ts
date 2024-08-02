export interface AuthFormValues {
  id: string;
  password: string;
}

export interface LogInFormDataValues {
  studentId?: string;
  loginId?: string;
  password: string;
  decryptionMethod: 'TOKEN' | 'KEY';
  decryptionValue: string;
}

export interface EncryptKeyInfo {
  rsaPublicKey: string;
  keyStorageStrategy: 'TOKEN' | 'KEY';
  credential: string;
}
