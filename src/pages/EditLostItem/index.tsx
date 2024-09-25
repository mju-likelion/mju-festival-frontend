import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ChangeEvent, useMemo, useState } from 'react';
import { patchLostItem, postLostItemImg } from '../../api/lostItem';
import Header from '../../components/Header';
import usePreventRefresh from '../../hooks/usePreventRefresh';
import { useAuthStore } from '../../store';
import { LostItemForm, LostItemRequest } from '../../types/lostItem';
import { getCurrentDate } from '../../utils/dateUtil';
import { handleError } from '../../utils/errorUtil';
import { lostItemEditSchema } from '../../validation/schema';
import FormActions from './FormActions';
import ImageUploader from './ImageUploader';
import LostItemFormFields from './LostItemFormFields';

const EditLostItem = () => {
  usePreventRefresh();

  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [editImgUrl, setEditImgUrl] = useState('');
  const { id, title, content, imageUrl } = location.state;
  const todayDate = useMemo(() => getCurrentDate(), []);

  const { register, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(lostItemEditSchema),
  });

  const titleCount = watch('title', '');
  const contentCount = watch('content', '');

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

  const onSubmit = async (formData: LostItemForm) => {
    try {
      const updateFields: Partial<LostItemRequest> = {};

      Object.entries(formData).forEach(([key, value]) => {
        const fieldKey = key as keyof LostItemRequest;
        if (value !== location.state[key]) {
          updateFields[fieldKey] = value;
        }
      });
      updateFields.imageUrl = editImgUrl || imageUrl;

      if (Object.keys(updateFields).length > 0 && token) {
        await patchLostItem(id, updateFields, token);
      }
      navigate('/lost-items');
    } catch (error) {
      handleError(error as Error);
    }
  };

  return (
    <Wrapper>
      <Header path={`/lost-items/${id}`} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TitleLayout>
          <Title>분실물 등록하기</Title>
          <SubTitle>분실물을 등록해주세요</SubTitle>
          <RegisterDate>{todayDate}</RegisterDate>
        </TitleLayout>

        <ImageUploader
          imageUrl={imageUrl}
          editImgUrl={editImgUrl}
          handleImgFile={handleImgFile}
        />
        <LostItemFormFields
          title={title}
          content={content}
          register={register}
          titleCount={titleCount}
          contentCount={contentCount}
        />
        <FormActions />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white100};
`;

const TitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 20px;
`;

const Title = styled.p`
  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.text900};
`;

const SubTitle = styled.p`
  ${({ theme }) => theme.typographies.callout};
  color: ${({ theme }) => theme.colors.text900};
  margin-top: 9px;
`;

const RegisterDate = styled.p`
  margin-top: 6px;
  align-self: flex-end;
  ${({ theme }) => theme.typographies.caption1};
  color: ${({ theme }) => theme.colors.gray400};
`;

export default EditLostItem;
