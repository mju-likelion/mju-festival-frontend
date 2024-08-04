import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { JSEncrypt } from 'jsencrypt';
import { getTerms, logIn, requestKey } from '../../api/LogIn.ts';
import LogInInput from './LogInInput.tsx';
import LogInButton from './LogInButton.tsx';
import CheckBox from './CheckBox.tsx';
import {
  AuthFormValues,
  EncryptKeyInfo,
  LogInFormDataValues,
  Terms,
} from '../../types';

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
  path: string,
  terms?: Map<string, boolean>
): LogInFormDataValues => {
  const { rsaPublicKey, credentialKey } = encryptInfo;

  const loginFormData: LogInFormDataValues = {
    encryptedPassword: '',
    key: '',
  };

  if (path === '/login') {
    loginFormData.encryptedStudentId =
      encryptFunc(formData.id, rsaPublicKey) || '';
    loginFormData.terms = terms;
  } else if (path === '/admin/login') {
    loginFormData.encryptedLoginId =
      encryptFunc(formData.id, rsaPublicKey) || '';
  }
  loginFormData.encryptedPassword =
    encryptFunc(formData.password, rsaPublicKey) || '';
  loginFormData.key = credentialKey;

  return loginFormData;
};

const LogInForm = () => {
  const [termsList, setTermsList] = useState<Terms[]>([]);
  const { register, handleSubmit } = useForm<AuthFormValues>();
  const location = useLocation();

  const getAuth = () => {
    if (location.pathname === '/login') {
      return 'user';
    }
    if (location.pathname === '/admin/login') {
      return 'admin';
    }
    throw new Error('로그인 외 경로');
  };

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const encryptInfo = await requestKey();
      const terms = new Map<string, boolean>(
        termsList.map((term) => [term.id, formData?.terms?.[term.id]] ?? false)
      );

      const encryptLogInData = setEncryptData(
        formData,
        encryptInfo,
        location.pathname,
        terms
      );
      await logIn(encryptLogInData, getAuth(), encryptInfo.rsaKeyStrategy);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error('알 수 없는 에러', e);
      }
    }
  });

  const getTermsData = async () => {
    const termsList = await getTerms();
    setTermsList(termsList);
  };

  useEffect(() => {
    getTermsData();
  }, []);

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
      {location.pathname === '/login' &&
        termsList.map((t) => (
          <div key={t.id}>
            <p>{t.title}</p>
            <p>{t.content}</p>
            <CheckBox name={`terms.${t.id}`} register={register} />
          </div>
        ))}
      <LogInButton />
    </form>
  );
};

export default LogInForm;
