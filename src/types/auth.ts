export interface AuthFormValues {
  id: string;
  password: string;
  terms: Record<string, boolean>;
}

export interface LogInFormDataValues {
  encryptedStudentId?: string;
  encryptedLoginId?: string;
  encryptedPassword: string;
  key: string;
  terms?: Map<string, boolean>;
}

export interface EncryptKeyInfo {
  rsaPublicKey: string;
  rsaKeyStrategy: 'REDIS' | 'TOKEN';
  credentialKey: string;
}

export interface Terms {
  id: string;
  title: string;
  content: string;
}
