import { JSEncrypt } from 'jsencrypt';
import {
  Auth,
  AuthFormValues,
  EncryptKeyInfo,
  LogInFormDataValues,
} from '../types';

const encryptionUtil = new JSEncrypt();

const encryptFunc = (value: string, key: string) => {
  if (!key) {
    throw new Error('encryptionUtil key가 유효하지 않습니다.');
  }
  encryptionUtil.setPublicKey(key);
  return encryptionUtil.encrypt(value);
};

const setEncryptData = (
  formData: AuthFormValues,
  encryptInfo: EncryptKeyInfo,
  auth: Auth
): LogInFormDataValues => {
  const { rsaPublicKey, credentialKey } = encryptInfo;

  const loginFormData: LogInFormDataValues = {
    encryptedPassword: '',
    key: '',
  };

  if (auth === 'USER') {
    loginFormData.encryptedStudentId =
      encryptFunc(formData.id, rsaPublicKey) || '';
  } else if (auth === 'ADMIN') {
    loginFormData.encryptedLoginId =
      encryptFunc(formData.id, rsaPublicKey) || '';
  }
  loginFormData.encryptedPassword =
    encryptFunc(formData.password, rsaPublicKey) || '';
  loginFormData.key = credentialKey;

  return loginFormData;
};

export { setEncryptData };
