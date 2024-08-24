import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { boothSchema } from '../../validation/schema.ts';
import { BoothEditFields } from '../../types';

const BoothEdit = () => {
  const locationData = useLocation();
  const { name, description, location, imageUrl } = locationData.state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoothEditFields>({
    resolver: yupResolver(boothSchema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
  });

  return (
    <>
      <EditForm onSubmit={onSubmit}>
        <Input {...register('name')} defaultValue={name} autoFocus />
        <p>{errors.name?.message}</p>
        <Textarea {...register('description')} defaultValue={description} />
        <p>{errors.description?.message}</p>
        <Input {...register('location')} defaultValue={location} />
        <p>{errors.location?.message}</p>
        <Img src={imageUrl} alt="부스 이미지" />
        <Button type="submit">수정하기</Button>
      </EditForm>
    </>
  );
};

const EditForm = styled.form``;
const Input = styled.input`
  border: 3px solid dodgerblue;
`;
const Textarea = styled.textarea`
  border: 3px solid pink;
`;
const Img = styled.img`
  width: 300px;
`;
const Button = styled.button``;

export default BoothEdit;
