import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'; // `ReactComponent`로 변경

interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ setIsModalOpen }: ModalProps) => {
  return (
    <>
      <OverlayWrapper>
        <Layout>
          <Close as={CloseIcon} onClick={() => setIsModalOpen(false)} />
          <Title>찾아간 분실물</Title>
          <Content>
            찾아간 분실물로
            <br />
            내용물을 확인할 수 없습니다.
          </Content>
          <Button type="button" onClick={() => setIsModalOpen(false)}>
            확인하기
          </Button>
        </Layout>
      </OverlayWrapper>
    </>
  );
};

const OverlayWrapper = styled.div`
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

const Layout = styled.div`
  z-index: 2;
  position: relative;
  max-width: 330px;
  width: calc(100vw - 60px);
  height: 238px;
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
