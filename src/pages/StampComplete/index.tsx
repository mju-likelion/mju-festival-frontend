import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as BigStamp } from '../../assets/icons/big-stamp.svg';
import { ReactComponent as BigCheck } from '../../assets/icons/big_check.svg';

const StampComplete = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <BigCheck />
      <Title>
        축하합니다
        <br />
        도장을 모두 모았습니다!
      </Title>
      <StampOutline>
        <BigStamp />
      </StampOutline>
      <SubTitle>
        자동으로 이벤트에 응모 되었습니다
        <br />
        행운의 주인공이 되어보세요!
      </SubTitle>
      <Button onClick={() => navigate('/main')}>홈으로</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 100px 20px 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white100};
`;

const Title = styled.p`
  text-align: center;
  margin-top: 15px;

  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.blue100};
`;

const StampOutline = styled.div`
  width: 188px;
  height: 188px;
  border: 1px dashed ${({ theme }) => theme.colors.purple200};
  border-radius: 50%;
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubTitle = styled.div`
  padding: 32px 0;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.blue400};
  border-bottom: 1px solid ${({ theme }) => theme.colors.blue400};
  margin-top: 30px;

  ${({ theme }) => theme.typographies.body1};
  color: ${({ theme }) => theme.colors.blue100};
`;

const Button = styled.button`
  width: 100%;
  padding: 16px 61px;
  border-radius: 12px;
  margin-top: 84px;

  ${({ theme }) => theme.typographies.body1};
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme }) => theme.colors.blue100};
`;

export default StampComplete;
