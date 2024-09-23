import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormActions = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <CheckButton type="submit">완료하기</CheckButton>
      <CancelButton type="button" onClick={() => navigate(-1)}>
        취소하기
      </CancelButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

export default FormActions;
