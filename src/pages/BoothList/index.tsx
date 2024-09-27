import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoothDepartments, getBooths } from '../../api/booth.ts';
import { BoothDepartment, BoothListObj } from '../../types';
import { ReactComponent as CheckedIcon } from '../../assets/icons/booth-checked.svg';
import { ReactComponent as UnCheckedIcon } from '../../assets/icons/booth-un-checked.svg';
import Header from '../../components/Header.tsx';
import { handleError } from '../../utils/errorUtil.ts';

const BoothPage = () => {
  const [departmentList, setDepartmentList] = useState<BoothDepartment[]>([]);
  useState<BoothDepartment[]>();
  const [selectedDepartmentIdArr, setSelectedDepartmentIdArr] = useState<
    string[]
  >([]);
  const [boothList, setBoothList] = useState<BoothListObj>({});
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const departments = await getBoothDepartments();
      setDepartmentList(departments);

      const boothsByDepartment = await Promise.all(
        departments.map(async (department) => {
          const booths = await getBooths(department.id);
          return { [department.id]: booths };
        })
      );

      const boothsObject = boothsByDepartment.reduce((acc, curr) => {
        return { ...acc, ...curr };
      }, {});

      setBoothList(boothsObject);
    } catch (e) {
      handleError(e as Error);
    }
  };

  const filterSelectedDepartments = (selectedIds: string[]) => {
    return Object.fromEntries(
      Object.entries(boothList).filter(([key]) => selectedIds.includes(key))
    );
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedDepartmentIdArr((prevState) =>
      prevState.includes(categoryId)
        ? prevState.filter((department) => department !== categoryId)
        : [...prevState, categoryId]
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deselectAllDepartments = () => {
    setSelectedDepartmentIdArr([]);
  };

  const filteredBooths =
    selectedDepartmentIdArr.length > 0
      ? filterSelectedDepartments(selectedDepartmentIdArr)
      : boothList;

  const isAnySelected = selectedDepartmentIdArr.length > 0;

  const getCategoryNameById = (id: string) => {
    const department = departmentList.find(
      (department) => department.id === id
    );
    return department ? department.categoryName : '';
  };

  return (
    <Wrapper>
      <Header path="/main" />
      <Title>부스정보</Title>
      <P>
        각 대학별 부스정보를 한 눈에 쉽게 파악하고 즐겁게 <br />
        축제를 즐기세요!
      </P>
      <DepartmentsSelectBox>
        {departmentList?.map(({ id, categoryName }) => (
          <Department
            key={id}
            role="button"
            $isChecked={selectedDepartmentIdArr.includes(id)}
            onClick={() => handleCategorySelect(id)}
          >
            {selectedDepartmentIdArr.includes(id) ? (
              <CheckedIcon width={24} />
            ) : (
              <UnCheckedIcon width={24} />
            )}
            <DepartmentName $isChecked={selectedDepartmentIdArr.includes(id)}>
              {categoryName}
            </DepartmentName>
          </Department>
        ))}
        <DeSelectButton
          role="button"
          $isChecked={isAnySelected}
          onClick={deselectAllDepartments}
        >
          선택해제
        </DeSelectButton>
      </DepartmentsSelectBox>

      <BoothList>
        <BoothWrapper>
          <DepartmentBooths>
            {Object.entries(filteredBooths)?.map(
              ([departmentId, boothList]) => {
                return (
                  <CategoryBox key={departmentId}>
                    <CategoryName>
                      {getCategoryNameById(departmentId)}
                    </CategoryName>
                    {boothList.map((booth) => (
                      <BoothBox
                        key={booth.id}
                        onClick={() => navigate(`/booths/${booth.id}`)}
                      >
                        <TextBox>
                          <Name>{booth.departmentName}</Name>
                          <Description>{booth.name}</Description>
                        </TextBox>
                        <Img src={booth.imageUrl} alt="부스 이미지" />
                      </BoothBox>
                    ))}
                  </CategoryBox>
                );
              }
            )}
          </DepartmentBooths>
        </BoothWrapper>
      </BoothList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white100};
`;
const Title = styled.p`
  margin: 32px 20px 10px;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.title1};
`;
const P = styled.p`
  margin: 0 20px;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.callout};
  line-height: normal;
`;
const DepartmentsSelectBox = styled.div`
  margin: 26px 0 15px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
`;
const Department = styled.div<{ $isChecked: boolean }>`
  width: 88px;
  padding: 3px;
  display: flex;
  align-items: center;
  border-radius: 999px;
  background-color: ${({ theme, $isChecked }) =>
    $isChecked ? theme.colors.blue100 : '#E1EBF0'};
  cursor: pointer;
`;
const DeSelectButton = styled.div<{ $isChecked: boolean }>`
  width: 88px;
  height: 30px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  background-color: ${({ theme, $isChecked }) =>
    $isChecked ? theme.colors.blue100 : '#E1EBF0'};
  cursor: pointer;
  text-align: center;
  color: ${({ theme, $isChecked }) =>
    $isChecked ? theme.colors.white100 : theme.colors.text500};
  ${({ theme }) => theme.typographies.footnote};
`;
const DepartmentName = styled.p<{ $isChecked: boolean }>`
  width: calc(100% - 24px);
  text-align: center;
  color: ${({ theme, $isChecked }) =>
    $isChecked ? theme.colors.white100 : theme.colors.text500};
  ${({ theme }) => theme.typographies.footnote};
`;
const BoothWrapper = styled.div`
  width: 100%;
`;
const BoothList = styled.div`
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;
const DepartmentBooths = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CategoryBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CategoryName = styled.div`
  width: 200px;
  padding-bottom: 6px;
  margin: 38px 0;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blue400};
  color: ${({ theme }) => theme.colors.blue100};
  ${({ theme }) => theme.typographies.title1};
`;
const BoothBox = styled.div`
  max-width: 350px;
  width: calc(100% - 20px);
  height: 124px;
  margin: 0 10px 15px 10px;
  padding: 12px 11px;
  box-shadow: 2px 2px 9px rgba(36, 39, 46, 0.3);
  border-radius: 12px;
  display: flex;
  gap: 10px;
`;
const TextBox = styled.div`
  width: calc(100% - 100px - 10px);
  display: flex;
  flex-direction: column;
`;
const Name = styled.p`
  width: 100%;
  display: block;
  overflow-wrap: break-word;
  white-space: normal;
  margin-bottom: 8px;
  padding-bottom: 10px;
  color: ${({ theme }) => theme.colors.blue100};
  ${({ theme }) => theme.typographies.title1};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black30};
`;
const Description = styled.p`
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.body2};
`;
const Img = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

export default BoothPage;
