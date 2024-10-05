import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleWithdraw: () => Promise<void>;
}

const Modal = ({ setIsModalOpen, handleWithdraw }: ModalProps) => {
  return (
    <>
      <OverlayWrapper>
        <Layout>
          <Close as={CloseIcon} onClick={() => setIsModalOpen(false)} />
          <Title>탈퇴하기</Title>
          <Content>
            탈퇴한 후에는
            <br />
            &apos;<span>부스 참여 기록</span>&apos;이 사라집니다.
            <br /> <br />
            내용을 확인하셨다면 버튼을 누르세요.
          </Content>
          <Button
            type="button"
            onClick={async () => {
              await handleWithdraw();
              setIsModalOpen(false);
            }}
          >
            확인하기
          </Button>
        </Layout>
      </OverlayWrapper>
    </>
  );
};

const OverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black30};
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Layout = styled.div`
  position: relative;
  max-width: 330px;
  width: calc(100vw - 60px);
  height: 248px;
  margin-top: 254px;
  padding: 28px 38px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white100};
`;

const Close = styled.img`
  position: absolute;
  top: 14px;
  left: 14px;
  cursor: pointer;
`;

const Title = styled.p`
  ${({ theme }) => theme.typographies.title1};
`;

const Content = styled.p`
  ${({ theme }) => theme.typographies.body2};
  line-height: 20px;
  white-space: pre-wrap;

  span {
    ${({ theme }) => theme.typographies.body1};
  }
`;

const Button = styled.button`
  width: 180px;
  padding: 16px;
  border-radius: 12px;
  ${({ theme }) => theme.typographies.body1};
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme }) => theme.colors.blue100};
`;

export default Modal;
