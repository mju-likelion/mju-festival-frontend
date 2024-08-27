import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface UpdateBtnProps {
  children: ReactNode;
}

const UpdateBtn: React.FC<UpdateBtnProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.button`
  background-color: ${({ theme }) => theme.colors.blue100};
  border-radius: 28px;
  color: white;
  width: 174px;
  height: 42px;
`;

export default UpdateBtn;
