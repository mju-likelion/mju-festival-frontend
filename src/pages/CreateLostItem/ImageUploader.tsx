import { ChangeEvent, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as UploadImage } from '../../assets/imgs/image_upload.svg';

interface ImageUploaderProps {
  imageUrl: string;
  handleImgFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const ImageUploader = ({ imageUrl, handleImgFile }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <Wrapper>
      <UploadImageLayout $imageUrl={imageUrl} onClick={handleClick}>
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
      </UploadImageLayout>
      <ImageInput
        type="file"
        name="image"
        ref={fileInputRef}
        onChange={handleImgFile}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 248px;
  padding: 0 20px;
  margin-bottom: 17px;
`;

const UploadImageLayout = styled.div<{ $imageUrl: string | null }>`
  width: 100%;
  height: 248px;
  padding: 76px 58px;
  border-radius: 12px;
  background-image: ${({ $imageUrl }) =>
    $imageUrl ? `url(${$imageUrl})` : 'none'};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
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
export default ImageUploader;
