import { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputType<T extends FieldValues> {
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
}: InputType<T>) => {
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
