/* eslint-disable jsx-a11y/media-has-caption */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners'; // react-spinners의 FadeLoader 가져오기
import { useZxing } from 'react-zxing';
import styled from 'styled-components';
import { postBoothVisit } from '../../api/booth';
import { ReactComponent as BottomLeft } from '../../assets/imgs/camera_outline_bottom_left.svg';
import { ReactComponent as BottomRight } from '../../assets/imgs/camera_outline_bottom_right.svg';
import { ReactComponent as TopLeft } from '../../assets/imgs/camera_outline_top_left.svg';
import { ReactComponent as TopRight } from '../../assets/imgs/camera_outline_top_right.svg';
import Header from '../../components/Header';
import { useAuthStore } from '../../store';
import { handleError } from '../../utils/errorUtil';

const QrReader = () => {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleResult = async (qrUrl: string) => {
    try {
      const url = new URL(qrUrl);
      const qrId = url.pathname.split('/')[2];
      const strategy = url.searchParams.get('strategy');

      if (qrId && token && strategy) {
        setIsLoading(true);
        await postBoothVisit(qrId, token, strategy);
      }
      navigate(`/stamps`);
    } catch (error) {
      handleError(error as Error);
      navigate(-1);
    } finally {
      setIsLoading(false);
    }
  };

  const { ref } = useZxing({
    onDecodeResult(result) {
      if (result) {
        handleResult(result.getText());
      }
    },
  });

  return (
    <Wrapper>
      <Header path={-1} />
      <TitleLayout>
        <Title>QR 촬영</Title>
        <SubTitle>각 부스별 QR을 촬영해서 도장을 모아보세요!</SubTitle>
      </TitleLayout>
      <Content>
        카메라 초점에 QR 이미지를 맞춰 촬영해주세요 <br />
        카메라에 인식이 안될 경우 촬영이 어려울 수도 있습니다
      </Content>
      <CameraLayout>
        <StyledTopLeft />
        <StyledTopRight />
        <StyledBottomLeft />
        <StyledBottomRight />
        <video ref={ref} />
        {isLoading && (
          <LoadingOverlay>
            <FadeLoader color="#9EC7FF" />
          </LoadingOverlay>
        )}
      </CameraLayout>
    </Wrapper>
  );
};

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black30};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white100};
  padding-bottom: 100px;
`;

const TitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 23px 20px 0 20px;
  gap: 9px;
`;

const Title = styled.p`
  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.text900};
`;

const SubTitle = styled.p`
  ${({ theme }) => theme.typographies.callout};
  color: ${({ theme }) => theme.colors.text900};
`;

const Content = styled.p`
  margin: auto;
  text-align: center;
  margin-top: 53px;
  ${({ theme }) => theme.typographies.subhead2};
  color: ${({ theme }) => theme.colors.text900};
`;

const CameraLayout = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 20px 50px 20px;
  height: 350px;

  & > video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 95%;
    height: 95%;
    object-fit: cover;
  }
`;

const StyledTopLeft = styled(TopLeft)`
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledTopRight = styled(TopRight)`
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledBottomLeft = styled(BottomLeft)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const StyledBottomRight = styled(BottomRight)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export default QrReader;
