import { useEffect, useState } from 'react';
import styled from 'styled-components';
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
import { ReactComponent as RightArrowIcon } from '../../assets/icons/right_arrow.svg';

import {
  AuthFormValues,
  EncryptKeyInfo,
  LogInFormDataValues,
  Terms,
  TermsMap,
} from '../../types';
import { loginSchema } from '../../validation/schema.ts';

interface LogInFormProps {
  setIsModalOpen: (b: boolean) => void;
}

const LogInForm = ({ setIsModalOpen }: LogInFormProps) => {
  const [termsList, setTermsList] = useState<Terms[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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

  const getUserTerms = (
    formDataTerms: TermsMap,
    encryptLogInData: LogInFormDataValues
  ) => {
    const terms: TermsMap = {};
    if (auth === 'USER') {
      termsList.forEach((term) => {
        terms[term.id] = formDataTerms?.[term.id] ?? false;
      });
      return { ...encryptLogInData, terms };
    }
    return encryptLogInData;
  };

  const login = async (
    encryptLogInData: LogInFormDataValues,
    encryptInfo: EncryptKeyInfo
  ) => {
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
  };

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const encryptInfo = await requestKey();
      let encryptLogInData = setEncryptData(formData, encryptInfo, auth);
      if (formData.terms) {
        encryptLogInData = getUserTerms(formData.terms, encryptLogInData);
      }
      await login(encryptLogInData, encryptInfo);
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
    <Form onSubmit={onSubmit}>
      <FieldWrapper>
        <InputWrapper>
          <LogInInput
            type="text"
            name="id"
            placeholder="아이디를 입력해주세요"
            register={register}
          />
          <HelperText>{errors.id?.message}</HelperText>
        </InputWrapper>
        <InputWrapper>
          <LogInInput
            type={isOpen ? 'text' : 'password'}
            name="password"
            placeholder="비밀번호를 입력해주세요"
            register={register}
            toggleEye={toggleEye}
            isOpen={isOpen}
          />
          <HelperText>{errors.password?.message}</HelperText>
        </InputWrapper>
      </FieldWrapper>
      <LogInButton />
      {auth === 'USER' && (
        <AdminLogin onClick={() => navigate('/admin/login')}>
          관리자용 로그인
          <RightArrowIcon />
        </AdminLogin>
      )}
      {auth === 'USER' &&
        termsList.map((t) => (
          <TermBox key={t.id}>
            <Title>{t.title}</Title>
            <Content>{t.content}</Content>
            <CheckWrapper>
              <P $isChecked={isChecked}>개인정보 수집동의</P>
              <CheckBox
                name={`terms.${t.id}`}
                register={register}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
              />
            </CheckWrapper>
            <p>{errors.terms?.[t.id]?.message}</p>
          </TermBox>
        ))}
    </Form>
  );
};

const Form = styled.form``;
const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const InputWrapper = styled.div``;
const HelperText = styled.p`
  padding: 2px 0 0 12px;
  color: ${({ theme }) => theme.colors.text700};
  ${({ theme }) => theme.typographies.footnote};
`;
const TermBox = styled.div`
  margin-top: 53px;
  ${({ theme }) => theme.typographies.footnote};
`;
const AdminLogin = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  text-align: end;
  color: ${({ theme }) => theme.colors.text500};
  ${({ theme }) => theme.typographies.footnote};
`;
const Title = styled.p`
  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.footnote};
`;
const Content = styled.div`
  height: 128px;
  padding: 8px 20px;
  overflow-y: scroll;
  white-space: pre-wrap;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.text600};
  background-color: ${({ theme }) => theme.colors.black10};
`;
const CheckWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;
const P = styled.p<{ $isChecked: boolean }>`
  color: ${({ theme, $isChecked }) =>
    $isChecked ? theme.colors.blue100 : theme.colors.text500};
  ${({ theme }) => theme.typographies.footnote};
`;

export default LogInForm;
