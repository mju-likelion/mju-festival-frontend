import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { getTerms, postLogIn, requestKey } from '../../api/postLogIn.ts';
import useDetermineRole from '../../hooks/useDetermineRole.ts';
import { handleError } from '../../utils/errorUtil.ts';

import { setEncryptData } from '../../utils/encryptionUtil.ts';
import { useAuthStore } from '../../store';
import LogInInput from './LogInInput.tsx';
import LogInButton from './LogInButton.tsx';
import CheckBox from './CheckBox.tsx';
import { AuthFormValues, Terms, TermsMap } from '../../types';
import { loginSchema } from '../../validation/schema.ts';

interface LogInFormProps {
  setIsModalOpen: (b: boolean) => void;
}

const LogInForm = ({ setIsModalOpen }: LogInFormProps) => {
  const [termsList, setTermsList] = useState<Terms[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { setRole, setToken } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const toggleEye = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const auth = useDetermineRole();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const encryptInfo = await requestKey();
      const encryptLogInData = setEncryptData(formData, encryptInfo, auth);
      const terms: TermsMap = {};
      if (auth === 'USER') {
        termsList.forEach((term) => {
          terms[term.id] = formData.terms?.[term.id] ?? false;
        });
        encryptLogInData.terms = terms;
      }

      const response = await postLogIn(
        encryptLogInData,
        auth,
        encryptInfo.rsaKeyStrategy
      );
      setToken(response.accessToken);
      setRole(response.role || 'STUDENT');
      setIsModalOpen(true);
      if (auth === 'ADMIN') {
        navigate('/');
      }
    } catch (e) {
      handleError(e as Error);
    }
  });

  const getTermsData = async () => {
    try {
      const termsList = await getTerms();
      setTermsList(termsList);
    } catch (e) {
      handleError(e as Error);
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
        type={isOpen ? 'text' : 'password'}
        name="password"
        placeholder="비밀번호를 입력해주세요"
        register={register}
        toggleEye={toggleEye}
      />
      <p>{errors.password?.message}</p>
      {auth === 'USER' &&
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
