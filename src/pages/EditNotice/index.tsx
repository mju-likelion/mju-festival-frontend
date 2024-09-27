import styled from 'styled-components';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Axios } from '../../api/Axios';
import { ReactComponent as UploadImage } from '../../assets/imgs/image_upload.svg';
import { useAuthStore } from '../../store';
import { DetailNoticeType, ImageNoticeType } from '../../types';
import { fetchNotice } from '../../api/notice.ts';
import Header from '../../components/Header.tsx';
import LoadingSpinner from '../../components/LoadingSpinner.tsx';
import ErrorMessage from '../../components/ErrorMessage.tsx';

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
  const { role, token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formData = new FormData();
  const imageData = new FormData();

  const { register, handleSubmit, watch } = useForm<ImageNoticeType>();
  const titleCount = watch('title', '');
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
        setError('잘못된 이미지 형식입니다.');
      }
    }
  };

  const handleFormSubmit = async (data: ImageNoticeType) => {
    setIsLoading(true);
    if (data.title) {
      formData.append('title', data.title);
    }
    if (data.content) {
      formData.append('content', data.content);
    }
    if (imageUrl) {
      formData.append('imageUrl', imageUrl);
    }
    if (role !== 'STUDENT_COUNCIL') {
      setError('공지 작성 권한이 없습니다.');
      return;
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
      setError('작성 형식이 잘못되었습니다');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Wrapper>
      <Header path={`/view/detail-notice/${id}`} />
      <TextLayout>
        <TopTitle>공지사항</TopTitle>
        <SubTitle>공지사항 내용</SubTitle>
      </TextLayout>
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
          <TitleContainer>
            <p>제목 :</p>
            <TitleInput
              {...register('title')}
              defaultValue={notice.title}
              maxLength={30}
              placeholder="제목을 입력해주세요"
            />
            <TitleLength>
              <p>({titleCount?.length}/30)</p>
            </TitleLength>
          </TitleContainer>
          <ContentContainer>
            <p>내용 :</p>
            <ContentInput
              {...register('content')}
              defaultValue={notice.content}
              maxLength={1000}
              placeholder="내용을 입력해주세요"
            />
            <ContentLength>
              <p>({contentCount?.length}/1000)</p>
            </ContentLength>
          </ContentContainer>
        </UploadContentLayout>
        <BtnWrapper>
          <CreateButton type="submit">완료하기</CreateButton>
          <CancelButton onClick={() => navigate(`/view/detail-notice/${id}`)}>
            취소하기
          </CancelButton>
        </BtnWrapper>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white100};
`;

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

const UploadContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 17px 20px 99px 20px;
`;

const TitleContainer = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text900};
`;

const TitleInput = styled.textarea`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
`;

const TitleLength = styled.div`
  display: flex;
  justify-content: end;

  p {
    font-size: 11px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text500};
  }
`;

const ContentContainer = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text900};
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 145px;
  font-size: 17px;
  font-weight: 400;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cdcccc;
    border-radius: 12px;
  }
`;

const ContentLength = styled.div`
  display: flex;
  justify-content: end;

  p {
    font-size: 11px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text500};
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  padding: 0 20px 88px 20px;
  gap: 6px;

  button {
    width: 100%;
    height: 52px;
    border-radius: 12px;
    font-size: 17px;
    font-weight: 600;
  }
`;

const CreateButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blue100};
  color: white;
`;

const CancelButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.blue100};
  color: ${({ theme }) => theme.colors.blue100};
`;

const TextLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 6px 0 6px 20px;
`;

const TopTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text900};
  white-space: nowrap;
`;

const SubTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text900};
`;

export default EditNotice;
