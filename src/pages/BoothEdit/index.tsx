import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { patchBoothDetail } from '../../api/booth.ts';

import { useAuthStore } from '../../store';
import { BoothEditFields } from '../../types';
import { handleError } from '../../utils/errorUtil.ts';
import { boothSchema } from '../../validation/schema.ts';

const BoothEdit = () => {
  const locationData = useLocation();
  const { id, name, description, location, imageUrl } = locationData.state;
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoothEditFields>({
    resolver: yupResolver(boothSchema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const updateFields: Partial<BoothEditFields> = {};
      Object.entries(formData).forEach(([key, value]) => {
        const fieldKey = key as keyof BoothEditFields;
        if (value !== locationData.state[key]) {
          updateFields[fieldKey] = value;
        }
      });

      if (Object.keys(updateFields).length > 0 && token) {
        await patchBoothDetail(id, updateFields, token);
      }
      navigate(`/booths/${id}`);
    } catch (e) {
      handleError(e as Error);
    }
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
