import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postLostItem, postLostItemImg } from '../../api/lostItem';
import { ReactComponent as UploadImage } from '../../assets/imgs/image_upload.svg';
import Header from '../../components/Header';
import usePreventRefresh from '../../hooks/usePreventRefresh';
import { useAuthStore } from '../../store';
import { LostItemForm, LostItemRequest } from '../../types/lostItem';
import { getCurrentDate } from '../../utils/dateUtil';
import { handleError } from '../../utils/errorUtil';
import { lostItemSchema } from '../../validation/schema';

const CreateLostItem = () => {
  usePreventRefresh();

  const [imageUrl, setImageUrl] = useState<string>('');
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const todayDate = useMemo(() => getCurrentDate(), []);

  const { register, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(lostItemSchema),
  });
  const titleCount = watch('title', '');
  const contentCount = watch('content', '');

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImgFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files.length > 0) {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        const imgUrl = await postLostItemImg(formData, token);

        setImageUrl(imgUrl);
        setValue('file', e.target.files[0]);
      }
    } catch (error) {
      handleError(error as Error);
    }
  };

  const onSubmit = async (data: LostItemForm) => {
    const lostItemData: LostItemRequest = {
      title: data.title,
      content: data.content,
      imageUrl,
    };

    try {
      await postLostItem(lostItemData, token);
      navigate('/lost-items');
    } catch (error) {
      handleError(error as Error);
    }
  };

  return (
    <Wrapper>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TitleLayout>
          <Title>분실물 등록하기</Title>
          <SubTitle>분실물을 등록해주세요</SubTitle>
          <RegisterDate>{todayDate}</RegisterDate>
        </TitleLayout>

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
            onChange={handleImgFile}
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
          <CheckButton type="submit">완료하기</CheckButton>
          <CancelButton onClick={() => navigate(-1)}>취소하기</CancelButton>
        </ButtonLayout>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const TitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 20px;
`;

const Title = styled.p`
  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.text900};
`;

const SubTitle = styled.p`
  ${({ theme }) => theme.typographies.callout};
  color: ${({ theme }) => theme.colors.text900};
  margin-top: 9px;
`;

const RegisterDate = styled.p`
  margin-top: 6px;
  align-self: flex-end;
  ${({ theme }) => theme.typographies.caption1};
  color: ${({ theme }) => theme.colors.gray400};
`;

const UploadImageLayout = styled.div`
  display: flex;
  width: 100%;
  height: 248px;
  padding: 0 20px;
  margin-bottom: 17px;
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
  cursor: pointer;
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
  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.text900};
`;

const TitleInput = styled.textarea`
  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.text500};
  width: 100%;
`;

const TitleLength = styled.p`
  display: flex;
  justify-content: end;

  p {
    font-size: 11px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text500};
  }
`;

const ContentContainer = styled.div`
  ${({ theme }) => theme.typographies.body2};
  color: ${({ theme }) => theme.colors.text900};
  padding-right: 5px;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 145px;
  ${({ theme }) => theme.typographies.body2};
  color: ${({ theme }) => theme.colors.text500};

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cdcccc;
    height: 20px;
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
  align-items: center;
  padding: 0 20px;
  gap: 6px;
`;

const Button = styled.button`
  width: 100%;
  border-radius: 12px;
  padding: 16px 11px;
  ${({ theme }) => theme.typographies.body1};
`;

const CheckButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme }) => theme.colors.blue100};
`;

const CancelButton = styled(Button)`
  color: ${({ theme }) => theme.colors.blue100};
  border: 1px solid ${({ theme }) => theme.colors.blue100};
`;

export default CreateLostItem;
