import { FadeLoader } from 'react-spinners';
import styled from 'styled-components';

interface LoadingSpinnerProps {
  isLoading: boolean;
}
const LoadingSpinner = ({ isLoading }: LoadingSpinnerProps) => {
  if (!isLoading) return null;

  return (
    <LoadingOverlay>
      <FadeLoader color="#9EC7FF" />
    </LoadingOverlay>
  );
};

const LoadingOverlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export default LoadingSpinner;
