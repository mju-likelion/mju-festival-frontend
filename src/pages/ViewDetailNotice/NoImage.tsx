import styled from 'styled-components';
import { ReactComponent as NoImageIcon } from '../../assets/icons/no_image_icon.svg';

const NoImage = () => {
  return (
    <Wrapper>
      <DefaultIconWrapper>
        <NoImageIcon />
        <p>NO IMAGE</p>
      </DefaultIconWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  padding: 94px 74px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const DefaultIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;

  p {
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text600};
  }
`;
export default NoImage;
