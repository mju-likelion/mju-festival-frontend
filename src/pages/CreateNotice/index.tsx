import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Axios } from '../../api/Axios';
import { ReactComponent as UploadImage } from '../../assets/imgs/image_upload.svg';
import { useAuthStore } from '../../store';
import { ImageNoticeType } from '../../types';
import { getCurrentDate } from '../../utils/date/dateUtil';
import { DateAndTimeFormat } from '../../utils/date/format/DateAndTimeFormat';
import Header from '../ViewDetailNotice/Header';

const CreateNotice = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token } = useAuthStore();

  const formData = new FormData();
  const imageData = new FormData();
  const { register, handleSubmit, watch } = useForm<ImageNoticeType>();
  const titleCount = watch('title', '');
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
        handleError(error as Error);
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
      navigate('/view/all-notices');
    } catch (error) {
      handleError(error as Error);
    }
  };

  return (
    <Wrapper>
      <Header title="공지사항">공지사항 내용</Header>
      <DateLayout>
        <p>등록일 : {getCurrentDate(DateAndTimeFormat)}</p>
      </DateLayout>
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
              {...register('title', { required: true })}
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
              {...register('content', { required: true })}
              maxLength={1000}
              placeholder="내용을 입력해주세요"
            />
            <ContentLength>
              <p>({contentCount?.length}/1000)</p>
            </ContentLength>
          </ContentContainer>
        </UploadContentLayout>
        <ButtonLayout>
          <CreateButton type="submit">완료하기</CreateButton>
          <CancelButton onClick={() => navigate(-1)}>취소하기</CancelButton>
        </ButtonLayout>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white100};
`;

const DateLayout = styled.div`
  display: flex;
  justify-content: end;
  padding: 6px 20px 6px 0;

  p {
    font-size: 11px;
    font-weight: 600;
    color: #939da6;
  }
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
  background-color: rgba(0, 0, 0, 0.3);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
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

const ButtonLayout = styled.div`
  display: flex;
  padding: 0 20px 88px 20px;
  gap: 6px;
`;

const CreateButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blue100};
  width: 100%;
  height: 52px;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white100};
  padding: 16px 0;
`;

const CancelButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.blue100};
  width: 100%;
  height: 52px;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blue100};
`;

export default CreateNotice;
