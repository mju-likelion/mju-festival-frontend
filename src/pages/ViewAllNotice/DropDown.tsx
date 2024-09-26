import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SortKey, SortOptions } from '../../types';
import { ReactComponent as DownArrowIcon } from '../../assets/icons/down_arrow.svg';
import { ReactComponent as UpArrowIcon } from '../../assets/icons/up_arrow.svg';

interface DropDownProps {
  setIsSorted: React.Dispatch<React.SetStateAction<SortKey>>;
  setPage: () => void;
}

const DropDown = ({ setIsSorted, setPage }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sortOptions: SortOptions = { desc: '최신순', asc: '나중순' };
  const [sortOption, setSortOption] = useState<string>(sortOptions.desc);
  const SelectContainerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      SelectContainerRef.current &&
      !SelectContainerRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSorted = (option: SortKey) => {
    setIsSorted(option);
    setPage();
    setSortOption(sortOptions[option]);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Wrapper ref={SelectContainerRef}>
      <DefaultLayout onClick={handleOpen}>
        <DefaultValue>{sortOption}</DefaultValue>
        {isOpen ? <UpArrowIcon /> : <DownArrowIcon />}
      </DefaultLayout>
      {isOpen && (
        <SelectOptions>
          {Object.entries(sortOptions).map(([key, value]) => (
            <Option key={key} onClick={() => handleSorted(key as SortKey)}>
              {value}
            </Option>
          ))}
        </SelectOptions>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 24px;
  flex-direction: column;
  gap: 1px;

  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const DefaultLayout = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  width: 70px;
  gap: 2px;
  border-radius: 99px;
  ${({ theme }) => theme.typographies.caption1}
  background-color: ${({ theme }) => theme.colors.gray300};
`;

const DefaultValue = styled.p`
  flex-grow: 1;
  text-align: right;
  color: ${({ theme }) => theme.colors.text800};
`;

const SelectOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 100%;
  gap: 2px;
  color: ${({ theme }) => theme.colors.black50};
`;

const Option = styled.div`
  display: flex;
  width: 100%;
  max-width: 70px;
  height: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 99px;
  ${({ theme }) => theme.typographies.caption1}
  background-color: ${({ theme }) => theme.colors.gray200};
`;

export default DropDown;
