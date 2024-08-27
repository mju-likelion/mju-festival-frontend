import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ChangeEvent, useState, useEffect } from 'react';
import Header from './Header';
import { postLostItemImg } from '../../api/lostItem';
import { useAuthStore } from '../../store';

const CreateLostItem = () => {
  const [imgFile, setImgFile] = useState<string>();
  const { token } = useAuthStore();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = () => {
    // 임시 console
  };

  const handleImgFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files.length > 0) {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        const imgUrl = await postLostItemImg(formData, token);
        setImgFile(imgUrl);
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
          <RegisterDate>등록일 </RegisterDate>
          <ImageContainer>
            <ItemImg src={imgFile || undefined} />
            <FileInputContainer>
              <ItemInput
                {...register('file')}
                type="file"
                onChange={handleImgFile}
                id="lostItem"
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
          <ItemTitle {...register('title')} placeholder="제목" />
          <ItemContent {...register('content')} placeholder="test 내용" />
        </ItemLayout>
        <button type="submit">등록하기</button>
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
