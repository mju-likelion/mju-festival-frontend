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
      <Header />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <UploadImageLayout onClick={handleClick}>
          <UploadImageIcon />
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
  color: white;
`;

export default EditNotice;
