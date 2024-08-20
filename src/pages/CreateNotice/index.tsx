import styled from 'styled-components';
import { ChangeEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Axios } from '../../api/Axios';
import Header from '../ViewDetailNotice/Header';
import { ReactComponent as UploadImage } from '../../assets/imgs/image_upload.svg';
import { useAuthStore } from '../../store';
import { ImageNoticeType } from '../../types';

const CreateNotice = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { token } = useAuthStore();
  const formData = new FormData();
  const imageData = new FormData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ImageNoticeType>();
  const contentCount = watch('content', '');

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

  const handleFormSubmit = async (data: ImageNoticeType) => {
    formData.append('title', data.title);
    formData.append('content', data.content);

    try {
      await Axios.post('/announcements', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
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
            {...register('content', { required: true, maxLength: 100 })}
            maxLength={100}
            placeholder="내용을 입력해주세요"
          />
          <p>{contentCount?.length}/100</p>
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

const ContentInput = styled.textarea`
  width: 331px;
  height: 220px;
  background-color: #eff0f6;
`;

const CreateButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blue100};
  width: 210px;
  height: 48px;
  border-radius: 28px;
  resize: 'none';
  color: white;
`;

export default CreateNotice;
