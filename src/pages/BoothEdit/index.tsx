import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { patchBoothDetail } from '../../api/booth.ts';
import { useAuthStore } from '../../store';
import { boothSchema } from '../../validation/schema.ts';

import Header from '../../components/Header.tsx';
import usePreventRefresh from '../../hooks/usePreventRefresh.ts';

import { ReactComponent as LocationIcon } from '../../assets/icons/location_icon.svg';

const BoothEdit = () => {
  usePreventRefresh();

  const locationData = useLocation();
  const { id, name, department, description, location, imageUrl } =
    locationData.state || {};
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ description: string }>({
    resolver: yupResolver(boothSchema),
    mode: 'onChange',
  });

  const descriptionWatch = watch('description', description);

  const onSubmit = handleSubmit(async (description) => {
    await patchBoothDetail(id, description, token);
    navigate(`/booths/${id}`);
  });

  useEffect(() => {
    if (!locationData.state) {
      alert('이전 페이지에서 데이터를 가져올 수 없습니다. 다시 시도해주세요.');
      navigate('/booths');
    }
  }, [locationData.state]);

  return (
    <>
      <Header path={`/booths/${id}`} />
      {locationData.state && (
        <Wrapper>
          <Title>부스정보</Title>
          <Department>{department}</Department>
          <EditForm onSubmit={onSubmit}>
            <BoothImg src={imageUrl} alt="부스 이미지" />
            <Name>{name}</Name>
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
            <LocationBox>
              <LocationTitle>부스위치:</LocationTitle>
              <StyledLocationIcon />
              <Location>{location}</Location>
            </LocationBox>
            <Buttons>
              <EditButton type="submit">완료하기</EditButton>
              <CancelButton
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  navigate(-1);
                }}
              >
                취소하기
              </CancelButton>
            </Buttons>
          </EditForm>
        </Wrapper>
      )}
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
const BoothImg = styled.img`
  width: 100%;
  margin-bottom: 16px;
  border-radius: 12px;
  object-fit: cover;
`;
const Name = styled.p`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.title1};
  overflow-wrap: break-word;
  white-space: normal;
`;
const FieldTitle = styled.p`
  display: block;
  margin-right: 10px;
  white-space: nowrap;
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
const DescriptionTextarea = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.body2};
`;
const Location = styled.p`
  width: 100%;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.body2};
  overflow-wrap: break-word;
  white-space: normal;
`;
const LocationBox = styled.div`
  height: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;
const LocationTitle = styled.p`
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.body2};
  white-space: nowrap;
`;
const StyledLocationIcon = styled(LocationIcon)`
  flex-shrink: 0;
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
