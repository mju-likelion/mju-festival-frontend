import styled from 'styled-components';
import { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form';
import { ReactComponent as Checked } from '../../assets/icons/checkbox_check.svg';
import { ReactComponent as UnChecked } from '../../assets/icons/checkbox_empty.svg';

interface InputPropTypes<T extends FieldValues> {
  name: string;
  register: UseFormRegister<T>;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}

const CheckBox = <T extends FieldValues>({
  name,
  register,
  isChecked,
  setIsChecked,
}: InputPropTypes<T>) => {
  return (
    <>
      <Input
        type="checkbox"
        id={name}
        {...register(name as FieldPath<T>)}
        onChange={() => setIsChecked(!isChecked)}
        required
      />
      <CustomLabel htmlFor={name}>
        {isChecked ? <Checked /> : <UnChecked />}
      </CustomLabel>
    </>
  );
};

const Input = styled.input`
  width: 10px;
  height: 20px;
  right: 28px;
  opacity: 0;
  position: absolute;
`;
const CustomLabel = styled.label`
  cursor: pointer;
`;

export default CheckBox;
