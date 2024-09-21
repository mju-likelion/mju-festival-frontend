import styled from 'styled-components';
import { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form';
import { ReactComponent as EyeClose } from '../../assets/icons/pwd_close.svg';
import { ReactComponent as EyeOpen } from '../../assets/icons/pwd_open.svg';

interface InputPropTypes<T extends FieldValues> {
  type: 'text' | 'password';
  name: FieldPath<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  toggleEye?: () => void;
  isOpen?: boolean;
}

const LogInInput = <T extends FieldValues>({
  type,
  name,
  placeholder,
  register,
  toggleEye = () => {},
  isOpen,
}: InputPropTypes<T>) => {
  return (
    <Box>
      <Input type={type} placeholder={placeholder} {...register(name)} />
      {name === 'password' && (
        <Button
          type="button"
          onClick={toggleEye}
          aria-label="비밀번호 입력 값 숨기기"
        >
          {isOpen ? <EyeOpen /> : <EyeClose />}
        </Button>
      )}
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  padding: 16px 12px;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.black10};
  border-radius: 12px;

  input {
    ${({ theme }) => theme.typographies.body2};
  }
`;
const Input = styled.input`
  &::placeholder {
    color: ${({ theme }) => theme.colors.text500};
  }
`;
const Button = styled.button`
  height: 20px;
`;
export default LogInInput;
