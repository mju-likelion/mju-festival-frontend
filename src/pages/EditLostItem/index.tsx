import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ChangeEvent, useState } from 'react';
import { patchLostItem, postLostItemImg } from '../../api/lostItem';
import { useAuthStore } from '../../store';
import { LostItemForm, LostItemRequest } from '../../types/lostItem';
import { handleError } from '../../utils/errorUtil';
import { lostItemEditSchema } from '../../validation/schema';
import Header from '../ViewDetailLostItem/Header'; // 이후 재사용 관련 다시 생각

const EditLostItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [editImgUrl, setEditImgUrl] = useState<string>('');
  const { id, title, content, imageUrl } = location.state;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(lostItemEditSchema) });

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
      throw error as Error;
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
        navigate('/lost-items');
      }
    } catch (error) {
      handleError(error as Error);
    }
  };

  return (
    <Wrapper>
      <Header />
      <EditForm onSubmit={handleSubmit(onSubmit)}>
        <ItemLayout>
          <ImageContainer>
            <ItemImg src={editImgUrl || imageUrl} />
            <FileInputContainer>
              <ItemInput
                {...register('file')}
                type="file"
                id="lostItem"
                accept="image/*"
                onChange={handleImgFile}
              />
              <ItemLabel htmlFor="lostItem">
                {!editImgUrl ? (
                  <>
                    이미지 업로드 <br /> (이미지는 한 장만 업로드 가능합니다.)
                    <br />
                    (JPG, GIF, PNG, PDF)
                  </>
                ) : (
                  ''
                )}
              </ItemLabel>
            </FileInputContainer>
          </ImageContainer>
          <ItemTitle
            defaultValue={title}
            {...register('title', { required: true, maxLength: 20 })}
            maxLength={70}
          />
          <ItemContent
            defaultValue={content}
            {...register('content', { required: true, maxLength: 100 })}
            maxLength={100}
          />
        </ItemLayout>
        <Button type="submit">수정하기</Button>
        <p>{errors.title?.message}</p>
        <p>{errors.content?.message}</p>
        <p>{errors.file?.message}</p>
      </EditForm>
    </Wrapper>
  );
};

const EditForm = styled.form``;
const Wrapper = styled.div`
  border: 1px solid red;
`;

const ItemLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background-color: gray;
`;
const ItemImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const FileInputContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ItemInput = styled.input`
  display: none;
`;
const ItemLabel = styled.label`
  text-align: center;
  line-height: 30px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;
const ItemTitle = styled.input``;
const ItemContent = styled.textarea`
  width: 100%;
  background-color: skyblue;
`;

const Button = styled.button``;
export default EditLostItem;
