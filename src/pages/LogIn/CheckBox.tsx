import { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputPropTypes<T extends FieldValues> {
  name: string;
  register: UseFormRegister<T>;
}

const CheckBox = <T extends FieldValues>({
  name,
  register,
}: InputPropTypes<T>) => {
  return <input type="checkbox" {...register(name as FieldPath<T>)} required />;
};

export default CheckBox;
