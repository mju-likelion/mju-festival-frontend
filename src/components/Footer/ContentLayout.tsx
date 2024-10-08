import styled from 'styled-components';
import FooterHomeIcon from '../../assets/icons/footer_home_icon.webp';
import FooterLinkIcon from '../../assets/icons/footer_link_icon.webp';
import FooterMJUIcon from '../../assets/icons/footer_mju_logo.webp';
import { openHyperlink } from '../../utils/openLinkUtil';

const ContentLayout = () => {
  return (
    <Wrapper>
      <IconContainer>
        <IconBox
          onClick={() => openHyperlink('https://www.mju.ac.kr/mjukr/index.do')}
        >
          <img
            src={FooterHomeIcon}
            alt="FooterHomeIcon"
            width="24px"
            height="24px"
          />
          <p>https://www.mju.ac.kr/mjukr/index.do</p>
        </IconBox>
        <IconBox
          onClick={() => openHyperlink('https://open.kakao.com/o/sneAIT0f')}
        >
          <img
            src={FooterLinkIcon}
            alt="FooterLinkIcon"
            width="24px"
            height="24px"
          />
          <p>https://open.kakao.com/o/sneAIT0f</p>
        </IconBox>
      </IconContainer>
      <img src={FooterMJUIcon} alt="FooterMJUIcon" width="94px" height="45px" />
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
