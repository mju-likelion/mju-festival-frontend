import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { patchBoothDetail } from '../../api/booth.ts';

import Header from '../../components/Header.tsx';
import { useAuthStore } from '../../store';
import { BoothEditFields } from '../../types';
import { handleError } from '../../utils/errorUtil.ts';
import { boothSchema } from '../../validation/schema.ts';

const BoothEdit = () => {
  const locationData = useLocation();
  const { id, name, department, description, location, imageUrl } =
    locationData.state;
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
      <Header />
      <Wrapper>
        <Title>부스정보</Title>
        <Department>{department}</Department>
        <EditForm onSubmit={onSubmit}>
          <Img src={imageUrl} alt="부스 이미지" />

          <NameInputBox>
            <FieldTitle>제목:</FieldTitle>
            <input {...register('name')} defaultValue={name} />
          </NameInputBox>
          <p>{errors.name?.message}</p>
          <DescriptionTextarea>
            <FieldTitle>내용:</FieldTitle>
            <textarea {...register('description')} defaultValue={description} />
          </DescriptionTextarea>
          <p>{errors.description?.message}</p>
          <LocationInput>
            <FieldTitle>위치:</FieldTitle>
            <input {...register('location')} defaultValue={location} />
          </LocationInput>
          <p>{errors.location?.message}</p>
          <Buttons>
            <EditButton type="submit" onClick={() => navigate(-1)}>
              완료하기
            </EditButton>
            <CancelButton onClick={() => navigate(-1)}>취소하기</CancelButton>
          </Buttons>
        </EditForm>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  padding: 0 20px;
`;
const Title = styled.p`
  margin: 10px 0;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.title1};
`;
const Department = styled.p`
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.callout};
`;
const EditForm = styled.form``;
const NameInputBox = styled.div`
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.title1};
  & > * {
    color: ${({ theme }) => theme.colors.text900};
    ${({ theme }) => theme.typographies.title1};
  }
`;
const FieldTitle = styled.p`
  height: 120px;
  display: inline-block;
  margin-right: 10px;
`;
const LocationInput = styled.div`
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.body2};
`;
const DescriptionTextarea = styled.div`
  display: flex;
  align-items: start;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.body2};
`;
const Img = styled.img`
  margin: 0 auto 18px;
  display: block;
  width: 300px;
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;
const EditButton = styled.button`
  width: 100%;
  padding: 16px 0;
  border-radius: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme }) => theme.colors.blue100};
  ${({ theme }) => theme.typographies.body1};
`;
const CancelButton = styled.button`
  width: 100%;
  padding: 16px 0;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.blue100};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.blue100};
  background-color: ${({ theme }) => theme.colors.white100};
  ${({ theme }) => theme.typographies.body1};
`;

export default BoothEdit;
