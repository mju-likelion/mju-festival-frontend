import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { patchBoothDetail } from '../../api/booth.ts';
import { useAuthStore } from '../../store';
import { BoothEditData, BoothEditFields } from '../../types';
import { handleError } from '../../utils/errorUtil.ts';
import { boothSchema } from '../../validation/schema.ts';

import { postLostItemImg } from '../../api/lostItem.ts';
import Header from '../../components/Header.tsx';
import usePreventRefresh from '../../hooks/usePreventRefresh.ts';
import ImageUploader from '../EditLostItem/ImageUploader.tsx';
import LoadingSpinner from '../../components/LoadingSpinner.tsx';

const BoothEdit = () => {
  usePreventRefresh();

  const locationData = useLocation();
  const { id, name, department, description, location, imageUrl } =
    locationData.state;
  const [isLoading, setIsLoading] = useState(false);
  const [editImgUrl, setEditImgUrl] = useState('');

  const { token } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BoothEditFields>({
    resolver: yupResolver(boothSchema),
    mode: 'onChange',
  });

  const nameWatch = watch('name', name);
  const descriptionWatch = watch('description', description);
  const locationWatch = watch('location', location);

  const handleImgFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files.length > 0) {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        const imgUrl = await postLostItemImg(formData, token);

        setEditImgUrl(imgUrl);
        setValue('file', e.target.files[0]);
      }
    } catch (error) {
      handleError(error as Error);
    }
  };

  const onSubmit = handleSubmit(async (formData) => {
    try {
      setIsLoading(true);
      const updateFields: Partial<BoothEditData> = {};
      Object.entries(formData).forEach(([key, value]) => {
        const fieldKey = key as keyof BoothEditData;
        if (value !== locationData.state[key]) {
          updateFields[fieldKey] = value;
        }
      });
      updateFields.imageUrl = editImgUrl || imageUrl;

      if (Object.keys(updateFields).length > 0 && token) {
        await patchBoothDetail(id, updateFields, token);
      }
      navigate(`/booths`);
      setIsLoading(false);
    } catch (e) {
      handleError(e as Error);
      setIsLoading(false);
    }
  });

  return (
    <>
      <Header path={`/booths/${id}`} />
      <LoadingSpinner isLoading={isLoading} />
      <Wrapper>
        <Title>부스정보</Title>
        <Department>{department}</Department>
        <EditForm onSubmit={onSubmit}>
          <ImageUploader
            imageUrl={imageUrl}
            editImgUrl={editImgUrl}
            handleImgFile={handleImgFile}
          />

          <NameInputBox>
            <FieldTitle>제목:</FieldTitle>
            <Input
              {...register('name')}
              defaultValue={name}
              maxLength={30}
              placeholder="부스명을 입력해주세요"
            />
          </NameInputBox>
          <LengthCount>({nameWatch.length}/30)</LengthCount>

          <p>{errors.name?.message}</p>
          <DescriptionTextarea>
            <FieldTitle>내용:</FieldTitle>
            <Textarea
              {...register('description')}
              defaultValue={description}
              maxLength={1000}
              placeholder="부스소개를 입력해주세요"
            />
          </DescriptionTextarea>
          <LengthCount>({descriptionWatch.length}/1000)</LengthCount>

          <p>{errors.description?.message}</p>
          <LocationInputBox>
            <FieldTitle>위치:</FieldTitle>
            <Input
              {...register('location')}
              defaultValue={location}
              maxLength={100}
              placeholder="위치를 입력해주세요"
            />
          </LocationInputBox>
          <LengthCount>({locationWatch.length}/30)</LengthCount>
          <p>{errors.location?.message}</p>
          <Buttons>
            <EditButton type="submit">완료하기</EditButton>
            <CancelButton onClick={() => navigate(-1)}>취소하기</CancelButton>
          </Buttons>
        </EditForm>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.white100};
`;
const Title = styled.p`
  margin: 10px 0;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.title1};
`;
const Department = styled.p`
  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.callout};
`;
const EditForm = styled.form`
  width: 100%;
  padding-bottom: 40px;
`;
const NameInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.title1};
  & > * {
    color: ${({ theme }) => theme.colors.text900};
    ${({ theme }) => theme.typographies.title1};
  }
`;
const FieldTitle = styled.p`
  display: block;
  margin-right: 10px;
  white-space: nowrap;
`;
const Input = styled.input`
  width: 100%;
`;
const LengthCount = styled.p`
  margin-bottom: 12px;
  text-align: end;
  color: ${({ theme }) => theme.colors.text500};
  ${({ theme }) => theme.typographies.caption2};
`;
const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.body2};
`;
const LocationInputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.body2};
  & > * {
    color: ${({ theme }) => theme.colors.text900};
    ${({ theme }) => theme.typographies.body2};
  }
`;
const DescriptionTextarea = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.body2};
`;
const Buttons = styled.button`
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
