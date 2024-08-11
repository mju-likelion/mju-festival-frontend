import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getTerms, logIn, requestKey } from '../../api/LogIn.ts';
import getAuth from '../../utils/getAuth.ts';
import { setEncryptData } from '../../utils/encryptionUtils.ts';

import LogInInput from './LogInInput.tsx';
import LogInButton from './LogInButton.tsx';
import CheckBox from './CheckBox.tsx';
import { AuthFormValues, Terms } from '../../types';
import { handleError } from '../../utils/errorUtils.ts';

const LogInForm = () => {
  const [termsList, setTermsList] = useState<Terms[]>([]);
  const { register, handleSubmit } = useForm<AuthFormValues>();
  const auth = getAuth();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const encryptInfo = await requestKey();
      const terms = new Map<string, boolean>(
        termsList.map((term) => [term.id, formData?.terms?.[term.id] ?? false])
      );
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
      <LogInInput
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        register={register}
      />
      {auth === 'user' &&
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
