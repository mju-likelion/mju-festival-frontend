import { Axios } from './Axios.ts';
import { EncryptKeyInformaion, LogInFormDataValues } from '../types';

export const requestKey = async () => {
  const response = await Axios.get<EncryptKeyInformaion>('/auth/key');
  return response.data.data;
};

export const logIn = async (logInFormData: LogInFormDataValues) => {
  await Axios.post('/auth/user/login', logInFormData);
};
