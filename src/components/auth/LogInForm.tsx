import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { JSEncrypt } from 'jsencrypt';
import { logIn, requestKey } from '../../api/LogIn.ts';
import {
  AuthFormValues,
  EncryptKeyInfo,
  LogInFormDataValues,
} from '../../types';
import LogInInput from './LogInInput.tsx';
import LogInButton from './LogInButton.tsx';

const encrypt = new JSEncrypt();
const encryptFunc = (value: string, key: string) => {
  if (!key) {
    throw new Error('encrypt key가 유효하지 않습니다.');
  }
  encrypt.setPublicKey(key);
  return encrypt.encrypt(value);
};

const setEncryptData = (
  formData: AuthFormValues,
  encryptInfo: EncryptKeyInfo,
  path: string
): LogInFormDataValues => {
  const { rsaPublicKey, keyStorageStrategy, credential } = encryptInfo;

  const loginFormData: LogInFormDataValues = {
    password: '',
    decryptionMethod: 'TOKEN',
    decryptionValue: '',
  };

  if (path === '/login') {
    loginFormData.studentId = encryptFunc(formData.id, rsaPublicKey) || '';
  } else if (path === '/admin/login') {
    loginFormData.loginId = encryptFunc(formData.id, rsaPublicKey) || '';
  }
  loginFormData.password = encryptFunc(formData.password, rsaPublicKey) || '';
  loginFormData.decryptionMethod = keyStorageStrategy;
  loginFormData.decryptionValue = credential;

  return loginFormData;
};

const LogInForm = () => {
  const { register, handleSubmit } = useForm<AuthFormValues>();
  const location = useLocation();
  const onSubmit = handleSubmit(async (formData) => {
    try {
      const encryptInfo = await requestKey();
      const encryptLogInData = setEncryptData(
        formData,
        encryptInfo,
        location.pathname
      );
      await logIn(encryptLogInData);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error('알 수 없는 에러', e);
      }
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <LogInInput
        type="text"
        name="id"
        placeholder="아이디를 입력해주세요"
        register={register}
      />
      <LogInInput
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        register={register}
      />
      <LogInButton />
    </form>
  );
};

export default LogInForm;
