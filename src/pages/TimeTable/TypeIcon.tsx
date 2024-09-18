import styled from 'styled-components';
import { PerformanceType } from '../../types';

interface TypeIconProps {
  type: PerformanceType;
  children: React.ReactNode;
}
const TypeIcon = ({ type, children }: TypeIconProps) => {
  return (
    <Wrapper type={type}>
      <p>{children}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ type: PerformanceType }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 24px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme, type }) => {
    switch (type) {
      case '댄스':
        return '#179A8C';
      case '밴드':
        return '#5766C6';
      case '힙합':
        return '#4B82EF';
      case '축하공연':
        return '#FFB20A';
      default:
        return theme.colors.white100;
    }
  }};
`;

export default TypeIcon;
