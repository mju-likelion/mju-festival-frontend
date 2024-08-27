import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Header from './Header';
import { postLostItem, postLostItemImg } from '../../api/lostItem';
import { useAuthStore } from '../../store';
import { lostItemSchema } from '../../validation/schema';
import { LostItemForm, PostLostItemRequest } from '../../types/lostItem';

const CreateLostItem = () => {
  const [imgFile, setImgFile] = useState<string>('');
  const { token } = useAuthStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(lostItemSchema),
  });

  const onSubmit = async (data: LostItemForm) => {
    const lostItemData: PostLostItemRequest = {
      title: data.title,
      content: data.content,
      imageUrl: imgFile,
    };

    try {
      await postLostItem(lostItemData, token);
    } catch (error) {
      throw error as Error;
    }
  };

  const handleImgFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files.length > 0) {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        const imgUrl = await postLostItemImg(formData, token);
        setImgFile(imgUrl);

        setValue('file', e.target.files[0]);
      }
    } catch (error) {
      throw error as Error;
    }
  };

  return (
    <Wrapper>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ItemLayout>
          <RegisterDate>등록일</RegisterDate>
          <ImageContainer>
            <ItemImg src={imgFile || undefined} />
            <FileInputContainer>
              <ItemInput
                {...register('file', { required: true })}
                type="file"
                onChange={handleImgFile}
                id="lostItem"
                // accept 조건 재확인 필수
                accept="image/*"
              />
              <ItemLabel htmlFor="lostItem">
                {!imgFile ? (
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
            {...register('title', { required: true, maxLength: 20 })}
            placeholder="제목"
            maxLength={20}
          />
          <ItemContent
            {...register('content', { required: true, maxLength: 100 })}
            placeholder="test 내용"
            maxLength={100}
          />
        </ItemLayout>
        <button type="submit">등록하기</button>
        <p>
          에러 :
          {errors.file?.message ||
            errors.title?.message ||
            errors.content?.message}
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid red;
`;

const ItemLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
const RegisterDate = styled.p``;
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
  background-color: #cccfde;
`;

export default CreateLostItem;
