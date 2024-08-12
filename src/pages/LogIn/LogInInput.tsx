import { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputPropTypes<T extends FieldValues> {
  type: 'text' | 'password';
  name: keyof T;
  placeholder: string;
  register: UseFormRegister<T>;
  // eslint-disable-next-line react/require-default-props
  toggleEye?: () => void;
}

const LogInInput = <T extends FieldValues>({
  type,
  name,
  placeholder,
  register,
  toggleEye = () => {},
}: InputPropTypes<T>) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name as FieldPath<T>)}
      />
      {name === 'password' && (
        <button type="button" onClick={toggleEye}>
          눈
        </button>
      )}
    </div>
  );
};

export default LogInInput;
