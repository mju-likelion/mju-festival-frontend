import { UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { LostItemForm } from '../../types/lostItem';

interface LostItemFormFieldsProps {
  register: UseFormRegister<LostItemForm>;
  titleCount: string;
  contentCount: string;
}

const LostItemFormFields = ({
  register,
  titleCount,
  contentCount,
}: LostItemFormFieldsProps) => {
  return (
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
  );
};

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

export default LostItemFormFields;
