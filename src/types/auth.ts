export interface AuthFormValues {
  id: string;
  password: string;
}

export interface LogInFormDataValues {
  studentId: string;
  password: string;
  decryptionMethod: 'TOKEN' | 'KEY';
  decryptionValue: string;
}

export interface EncryptKeyInformaion {
  message: string;
  data: EncryptKey;
}

export interface EncryptKey {
  rsaPublicKey: string;
  keyStorageStrategy: 'TOKEN' | 'KEY';
  credential: string;
}
