export interface AuthFormValues {
  id: string;
  password: string;
  checkbox: boolean;
}

export interface LogInFormDataValues {
  encryptedStudentId?: string;
  encryptedLoginId?: string;
  encryptedPassword: string;
  key: string;
  terms?: object;
}

export interface EncryptKeyInfo {
  rsaPublicKey: string;
  rsaKeyStrategy: 'REDIS' | 'TOKEN';
  credentialKey: string;
}
