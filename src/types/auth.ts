export interface TermsMap {
  [key: string]: boolean;
}

export interface AuthFormValues {
  id: string;
  password: string;
  terms?: TermsMap;
}

export interface LogInFormDataValues {
  encryptedStudentId?: string;
  encryptedLoginId?: string;
  encryptedPassword: string;
  key: string;
  terms?: TermsMap;
}

export interface EncryptKeyInfo {
  rsaPublicKey: string;
  rsaKeyStrategy: string;
  credentialKey: string;
}

export interface Terms {
  id: string;
  title: string;
  content: string;
}

export type Auth = 'USER' | 'ADMIN';

export type Role = '' | 'STUDENT' | 'STUDENT_COUNCIL' | 'BOOTH_MANAGER';
