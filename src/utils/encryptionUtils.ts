import { JSEncrypt } from 'jsencrypt';
import {
  AuthFormValues,
  EncryptKeyInfo,
  LogInFormDataValues,
  TermsMap,
} from '../types';

const encryptionUtils = new JSEncrypt();

const encryptFunc = (value: string, key: string) => {
  if (!key) {
    throw new Error('encryptionUtils key가 유효하지 않습니다.');
  }
  encryptionUtils.setPublicKey(key);
  return encryptionUtils.encrypt(value);
};

const setEncryptData = (
  formData: AuthFormValues,
  encryptInfo: EncryptKeyInfo,
  auth: 'user' | 'admin',
  terms?: TermsMap
): LogInFormDataValues => {
  const { rsaPublicKey, credentialKey } = encryptInfo;

  const loginFormData: LogInFormDataValues = {
    encryptedPassword: '',
    key: '',
  };

  if (auth === 'user') {
    loginFormData.encryptedStudentId =
      encryptFunc(formData.id, rsaPublicKey) || '';
    loginFormData.terms = terms;
  } else if (auth === 'admin') {
    loginFormData.encryptedLoginId =
      encryptFunc(formData.id, rsaPublicKey) || '';
  }
  loginFormData.encryptedPassword =
    encryptFunc(formData.password, rsaPublicKey) || '';
  loginFormData.key = credentialKey;

  return loginFormData;
};

export { setEncryptData, encryptFunc };
