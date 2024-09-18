import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchInputIcon } from '../../assets/icons/search_input.svg';

interface SearchInputProps {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ setKeyword }: SearchInputProps) => {
  const handleKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <Wrapper>
      <Input placeholder="검색어를 입력해주세요" onChange={handleKeyword} />
      <SubmitButton type="submit">
        <SearchInputIcon />
      </SubmitButton>
    </Wrapper>
  );
};

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  padding: 12px 10px;
  margin-top: 34px;
  background-color: ${({ theme }) => theme.colors.black10};
  border-radius: 8px;
  gap: 8px;
`;

const Input = styled.input`
  flex-grow: 1;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text500};
  ${({ theme }) => theme.typographies.body2}

  &:focus {
    color: ${({ theme }) => theme.colors.text900};
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
`;

export default SearchInput;
