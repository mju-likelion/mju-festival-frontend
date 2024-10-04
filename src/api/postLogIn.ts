import { Auth, EncryptKeyInfo, LogInFormDataValues, Terms } from '../types';
import { Axios } from './Axios.ts';

export const requestKey = async () => {
  const response = await Axios.get<EncryptKeyInfo>('/auth/key');
  return response.data;
};

export const getTerms = async () => {
  const response = await Axios.get<Terms[]>('/terms');
  return response.data;
};

export const postLogIn = async (
  logInFormData: LogInFormDataValues,
  auth: Auth,
  rsaKeyStrategy: string
) => {
  const response = await Axios.post(
    `/auth/${auth.toLowerCase()}/login?rsaKeyStrategy=${rsaKeyStrategy}`,
    logInFormData
  );
  return response.data;
};
