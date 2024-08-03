import { Axios } from './Axios.ts';
import { EncryptKeyInfo, LogInFormDataValues } from '../types';

export const requestKey = async () => {
  const response = await Axios.get<EncryptKeyInfo>('/auth/key');
  return response.data;
};

export const logIn = async (
  logInFormData: LogInFormDataValues,
  auth: 'user' | 'admin',
  rsaKeyStrategy: string
) => {
  await Axios.post(
    `/auth/${auth}/login?rsaKeyStrategy=${rsaKeyStrategy}`,
    logInFormData
  );
};
