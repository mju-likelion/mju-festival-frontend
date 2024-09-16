import styled from 'styled-components';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../api/Axios';
import Header from '../ViewDetailNotice/Header';
import { ReactComponent as UploadImage } from '../../assets/imgs/image_upload.svg';
import { useAuthStore, usePageStore } from '../../store';
import { ImageNoticeType } from '../../types';

const CreateNotice = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const { setCurPage, setIsSorted } = usePageStore();
  const formData = new FormData();
  const imageData = new FormData();

  const { register, handleSubmit, watch } = useForm<ImageNoticeType>();
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
        const {
          data: { url },
        } = await Axios.post(`/images?type=ANNOUNCEMENT`, imageData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setImageUrl(url);
      } catch (error) {
        console.error('이미지 업로드 오류', error);
      }
    }
  };

  const handleFormSubmit = async (data: ImageNoticeType) => {
    formData.append('title', data.title);
    formData.append('content', data.content);
    if (imageUrl) {
      formData.append('imageUrl', imageUrl);
    }

    try {
      await Axios.post('/announcements', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setCurPage(0);
      setIsSorted('desc');
      navigate('/view/all-notices');
    } catch (e) {
      alert('올바른 업로드를 해주세요');
    }
    /**
     * @Todo finally 추가
     */
  };

  return (
    <Wrapper>
      <Header>공지사항</Header>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <UploadImageLayout>
          <UploadImageContainer $imageUrl={imageUrl} onClick={handleClick}>
            {!imageUrl && (
              <UploadGuideBox>
                <UploadImageIcon />
                <p>이미지 업로드</p>
                <p>
                  (이미지는 한 장만 업로드 가능 합니다.)
                  <br />
                  (JPG,GIF,PNG,PDF)
                </p>
              </UploadGuideBox>
            )}
          </UploadImageContainer>
          <ImageInput
            type="file"
            name="image"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
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
  display: flex;
  width: 100%;
  height: 248px;
  padding: 0 20px;
`;

const UploadImageContainer = styled.div<{ $imageUrl: string | null }>`
  width: 100%;
  height: 248px;
  padding: 76px 58px;
  border-radius: 12px;
  background-image: ${(props) =>
    props.$imageUrl ? `url(${props.$imageUrl})` : 'none'};
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.3);
`;

const UploadGuideBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  p:nth-of-type(1) {
    margin-top: 4px;
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text600};
  }
  p:nth-of-type(2) {
    margin-bottom: 8px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text500};
    text-align: center;
    white-space: nowrap;
  }
`;

const UploadImageIcon = styled(UploadImage)`
  left: 150px;
  top: 80px;
`;

const ImageInput = styled.input`
  display: none;
`;

const TitleInput = styled.input`
  border: none;
`;

const UploadContentLayout = styled.div`
  border: 2px solid red;
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
  color: white;
`;

export default CreateNotice;
