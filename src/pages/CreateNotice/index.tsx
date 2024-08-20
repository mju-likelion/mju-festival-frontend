import styled from 'styled-components';
import { ChangeEvent, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Axios } from '../../api/Axios';
import Header from '../ViewDetailNotice/Header';
import { ReactComponent as UploadImage } from '../../assets/imgs/image_upload.svg';
import { useAuthStore } from '../../store';

type Notice = {
  imageURL?: string;
  title: string;
  content: string;
};
const CreateNotice = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formData = new FormData();
  const imageData = new FormData();
  const { token } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Notice>();

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      imageData.append('image', file);
      try {
        const response = await Axios.post(
          `/images?type=ANNOUNCEMENT`,
          imageData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        formData.append('imageUrl', response.data.url);
      } catch (error) {
        console.error('이미지 업로드 오류', error);
      }
    }
  };

  const handleFormSubmit = async (data: Notice) => {
    formData.append('title', data.title);
    formData.append('content', data.content);

    try {
      const response = await Axios.post('/announcements', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
    } catch (e) {
      alert('올바른 업로드를 해주세요');
    }
    /**
     * @Todo finally 추가
     */
  };

  return (
    <Wrapper>
      <Header />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <UploadImageLayout onClick={handleClick}>
          <UploadImageIcon />
          <ImageInput
            type="file"
            name="image"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </UploadImageLayout>
        <UploadContentLayout>
          <p>제목</p>
          <TitleInput
            {...register('title', { required: true })}
            placeholder="입력해주세요"
          />
          <ContentInput
            {...register('content', { required: true })}
            placeholder="내용을 입력해주세요"
          />
        </UploadContentLayout>
        <CreateButton type="submit">공지사항 올리기</CreateButton>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const UploadImageLayout = styled.div`
  position: relative;
  width: 330px;
  height: 268px;
  border-radius: 14px;
  background-color: #cccfde;
  border: dotted 1px #9197b5;
`;

const UploadContentLayout = styled.div`
  border: 1px solid red;
`;

const UploadImageIcon = styled(UploadImage)`
  position: absolute;
  left: 150px;
  top: 80px;
`;

const ImageInput = styled.input`
  display: none;
`;

const TitleInput = styled.input`
  border: none;
`;

const ContentInput = styled.input`
  width: 331px;
  height: 220px;
  background-color: #eff0f6;
`;

const CreateButton = styled.button`
  background-color: #002968;
  width: 210px;
  height: 48px;
  border-radius: 28px;
  color: white;
`;

export default CreateNotice;
