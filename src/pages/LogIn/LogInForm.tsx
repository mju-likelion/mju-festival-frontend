import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getTerms, logIn, requestKey } from '../../api/LogIn.ts';
import getAuth from '../../utils/getAuth.ts';
import { handleError } from '../../utils/errorUtils.ts';

import { setEncryptData } from '../../utils/encryptionUtils.ts';
import LogInInput from './LogInInput.tsx';
import LogInButton from './LogInButton.tsx';
import CheckBox from './CheckBox.tsx';
import { AuthFormValues, Terms, TermsMap } from '../../types';
import { schema } from '../../validation/schema.ts';

const LogInForm = () => {
  const [termsList, setTermsList] = useState<Terms[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const auth = getAuth();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const encryptInfo = await requestKey();

      const terms: TermsMap = {};
      termsList.forEach((term) => {
        terms[term.id] = formData.terms?.[term.id] ?? false;
      });

      const encryptLogInData = setEncryptData(
        formData,
        encryptInfo,
        auth,
        terms
      );

      await logIn(encryptLogInData, auth, encryptInfo.rsaKeyStrategy);
    } catch (e) {
      handleError(e);
    }
  });

  const getTermsData = async () => {
    try {
      const termsList = await getTerms();
      setTermsList(termsList);
    } catch (e) {
      handleError(e);
    }
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
      <p>{errors.id?.message}</p>
      <LogInInput
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        register={register}
      />
      <p>{errors.password?.message}</p>
      {auth === 'user' &&
        termsList.map((t) => (
          <div key={t.id}>
            <p>{t.title}</p>
            <p>{t.content}</p>
            <CheckBox name={`terms.${t.id}`} register={register} />
            <p>{errors.terms?.[t.id]?.message}</p>
          </div>
        ))}
      <LogInButton />
    </form>
  );
};

export default LogInForm;
