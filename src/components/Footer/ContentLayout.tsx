import styled from 'styled-components';
import { ReactComponent as FooterHomeIcon } from '../../assets/icons/footer_home_icon.svg';
import { ReactComponent as FooterLinkIcon } from '../../assets/icons/footer_link_icon.svg';
import { ReactComponent as FooterMJUIcon } from '../../assets/icons/footer_mju_logo.svg';
import { openHyperlink } from '../../utils/openLinkUtil';

const ContentLayout = () => {
  return (
    <Wrapper>
      <IconContainer>
        <IconBox
          onClick={() => openHyperlink('https://www.mju.ac.kr/mjukr/index.do')}
        >
          <FooterHomeIcon />
          <p>https://www.mju.ac.kr/mjukr/index.do</p>
        </IconBox>
        <IconBox
          onClick={() => openHyperlink('https://open.kakao.com/o/sneAIT0f')}
        >
          <FooterLinkIcon />
          <p>https://open.kakao.com/o/sneAIT0f</p>
        </IconBox>
      </IconContainer>
      <FooterMJUIcon />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  p {
    ${({ theme }) => theme.typographies.footer};
    color: ${({ theme }) => theme.colors.white100};
  }
`;

export default ContentLayout;
