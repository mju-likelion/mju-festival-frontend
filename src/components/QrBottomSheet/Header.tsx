import styled from 'styled-components';
import { ReactComponent as DownIcon } from '../../assets/icons/sheet_down_arrow.svg';
import { ReactComponent as UpIcon } from '../../assets/icons/sheet_up_arrow.svg';

interface HeaderProps {
  isOpen: boolean;
}

const Header = ({ isOpen }: HeaderProps) => {
  return <Wrapper>{isOpen ? <DownIcon /> : <UpIcon />}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: center;
`;

export default Header;
