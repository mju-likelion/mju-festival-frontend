import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as DownArrowIcon } from '../../assets/icons/down_arrow.svg';
import { ReactComponent as UpArrowIcon } from '../../assets/icons/up_arrow.svg';
import { SortKey, SortOptions } from '../../types';

interface SortDropDownProps {
  setSorted: React.Dispatch<React.SetStateAction<SortKey>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const SortDropDown = ({ setSorted, setPage }: SortDropDownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sortOptions: SortOptions = { desc: '최신순', asc: '오래된순' };
  const [sortOption, setSortOption] = useState(sortOptions.desc);
  const SelectContainerRef = useRef<HTMLDivElement | null>(null);

  // dropdown 이외 클릭 시 close
  const handleClickOutside = (e: TouchEvent) => {
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
    setSorted(option);
    setPage(0);
    setSortOption(sortOptions[option]);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [SelectContainerRef]);

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
  height: 24px;
  margin: 34px 0 10px 0;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  gap: 1px;

  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const DefaultLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2px;

  padding: 0 1px 0 15px;
  border-radius: 99px;
  ${({ theme }) => theme.typographies.caption1}
  background-color: ${({ theme }) => theme.colors.gray300};
  flex-grow: 1;
`;

const DefaultValue = styled.p`
  flex-grow: 1;
  text-align: right;
  color: ${({ theme }) => theme.colors.text800};
`;

const SelectOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  color: ${({ theme }) => theme.colors.black50};
  z-index: 1;
`;

const Option = styled.div`
  display: flex;
  height: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 99px;
  ${({ theme }) => theme.typographies.caption1}
  background-color: ${({ theme }) => theme.colors.gray200};
`;

export default SortDropDown;
