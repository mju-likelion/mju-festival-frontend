import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'; // `ReactComponent`로 변경

interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}

const Modal = ({ setIsModalOpen, handleDelete }: ModalProps) => {
  return (
    <>
      <OverlayWrapper>
        <Layout>
          <Close as={CloseIcon} onClick={() => setIsModalOpen(false)} />
          <Title>삭제하기 전 유의사항</Title>
          <Content>
            게시물 삭제 후 게시물
            <br />
            복구가 되지 않습니다. <br />
            <br />
            확인하신 후 삭제해주시길 바랍니다.
          </Content>
          <Button type="button" onClick={() => handleDelete()}>
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
  align-items: center;
`;

const Layout = styled.div`
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
