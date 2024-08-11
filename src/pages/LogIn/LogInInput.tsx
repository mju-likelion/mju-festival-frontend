import { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputPropTypes<T extends FieldValues> {
  type: string;
  name: keyof T;
  placeholder: string;
  register: UseFormRegister<T>;
}

const LogInInput = <T extends FieldValues>({
  type,
  name,
  placeholder,
  register,
}: InputPropTypes<T>) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name as FieldPath<T>)}
      />
    </div>
  );
};

export default LogInInput;
