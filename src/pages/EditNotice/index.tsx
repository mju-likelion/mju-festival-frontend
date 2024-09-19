import styled from 'styled-components';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Axios } from '../../api/Axios';
import Header from '../ViewDetailNotice/Header';
import { ReactComponent as UploadImage } from '../../assets/imgs/image_upload.svg';
import { useAuthStore } from '../../store';
import { DetailNoticeType, ImageNoticeType } from '../../types';
import { fetchNotice } from '../../api/notice.ts';

const EditNotice = () => {
  const [notice, setNotice] = useState<DetailNoticeType>({
    id: '',
    title: '',
    content: '',
    createdAt: new Date(),
    imageUrl: '',
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { id } = useParams();
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formData = new FormData();
  const imageData = new FormData();

  const { register, handleSubmit, watch } = useForm<ImageNoticeType>();
  const contentCount = watch('content', '');

  const getNotice = useCallback(async () => {
    const response = await fetchNotice(id);
    setNotice(response);
    if (response.imageUrl) setImageUrl(response.imageUrl);
  }, [id]);

  useEffect(() => {
    getNotice();
  }, [getNotice]);

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
        const { data } = await Axios.post(
          `/images?type=ANNOUNCEMENT`,
          imageData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setImageUrl(data.url);
      } catch (error) {
        console.error('이미지 업로드 오류', error);
      }
    }
  };

  const handleFormSubmit = async (data: ImageNoticeType) => {
    if (data.title) {
      formData.append('title', data.title);
    }
    if (data.content) {
      formData.append('content', data.content);
    }
    if (imageUrl) {
      formData.append('imageUrl', imageUrl);
    }

    try {
      await Axios.patch(`/announcements/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      navigate(`/view/detail-notice/${id}`);
    } catch (e) {
      alert('올바른 업로드를 해주세요');
    }
    /**
     * @Todo finally 추가
     */
  };

  return (
    <Wrapper>
      <Header title="공지사항">공지사항 내용</Header>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <UploadImageLayout $imageUrl={imageUrl} onClick={handleClick}>
          {!imageUrl && (
            <UploadGuideContainer>
              <UploadImageIcon />
              <p>이미지 업로드</p>
              <p>(이미지는 한 장만 업로드 가능 합니다.)</p>
              <p>(JPG,GIF,PNG,PDF)</p>
            </UploadGuideContainer>
          )}
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
            {...register('title')}
            defaultValue={notice.title}
            placeholder="입력해주세요"
          />
          <ContentInput
            {...register('content', { maxLength: 100 })}
            defaultValue={notice.content}
            maxLength={100}
            placeholder="내용을 입력해주세요"
          />
          <p>{contentCount?.length}/100</p>
        </UploadContentLayout>
        <CreateButton type="submit">수정하기</CreateButton>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const UploadImageLayout = styled.div<{ $imageUrl: string | null }>`
  position: relative;
  display: flex;
  justify-content: center;
  width: 330px;
  height: 268px;
  border-radius: 14px;
  background-image: ${(props) =>
    props.$imageUrl ? `url(${props.$imageUrl})` : 'none'};
  background-size: cover;
  background-color: #cccfde;
  border: dotted 1px #9197b5;
  padding: 76px 58px;
`;

const UploadContentLayout = styled.div`
  border: 1px solid red;
`;

const UploadGuideContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;

  p:nth-of-type(1) {
    margin-top: 14px;
    margin-bottom: 2px;
  }
  p:nth-of-type(2) {
    margin-bottom: 8px;
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

export default EditNotice;
