import { useForm } from 'react-hook-form';
import { JSEncrypt } from 'jsencrypt';
import LogInInput from './LogInInput.tsx';
import LogInButton from './LogInButton.tsx';
import { AuthFormValues } from '../../types';

const encrypt = new JSEncrypt();
const publicKey = import.meta.env.VITE_DUMMY_PUBLICKEY;

const encryptFunc = (value: string) => {
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(value) || '';
};

const LogInForm = () => {
  const { register, handleSubmit } = useForm<AuthFormValues>();

  const onSubmit = handleSubmit((formData) => {
    const encryptDataObj: Partial<AuthFormValues> = {};

    Object.keys(formData).forEach((key) => {
      const authFormKey = key as keyof AuthFormValues;
      encryptDataObj[authFormKey] = encryptFunc(formData[authFormKey]);
    });
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
