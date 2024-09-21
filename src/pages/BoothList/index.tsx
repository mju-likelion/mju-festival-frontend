import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { getBoothDepartments, getBooths } from '../../api/booth.ts';
import { BoothInfo, CheckState, SelectedBooths } from '../../types';
import { ReactComponent as CheckedIcon } from '../../assets/icons/booth-checked.svg';
import { ReactComponent as UnCheckedIcon } from '../../assets/icons/booth-un-checked.svg';
import Header from '../../components/Header.tsx';

const BoothPage = () => {
  // 전체 카테고리의 선택 상태 및 정보를 저장
  const [allDepartmentsCheckState, setAllDepartmentsCheckState] = useState<
    CheckState[]
  >([]);
  // 선택된 카테고리들의 정보를 저장
  const [selectedDepartmentsState, setSelectedDepartmentsState] = useState<
    SelectedBooths[]
  >([]);

  const [boothListData, setBoothListData] = useState<
    Record<string, BoothInfo[]>
  >({});

  const [selectedBoothListData, setSelectedBoothListData] = useState<
    Record<string, BoothInfo[]>
  >({});

  const [selectedDepartmentTotalPage, setSelectedDepartmentTotalPage] =
    useState<Record<string, number>>({});

  // 데이터 페칭 로딩 중 상태 저장
  const [isLoading, setIsLoading] = useState(false);
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [fetchingBoothIndex, setFetchingBoothIndex] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { ref, inView } = useInView();
  const setRef = ref as React.RefCallback<HTMLDivElement>;

  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    // department(카테고리) list
    const departments = await getBoothDepartments();
    const initialCheckState = departments.map((department) => ({
      ...department,
      isChecked: false,
    }));
    setAllDepartmentsCheckState(initialCheckState);
  };

  const fetchNextDepartmentBoothList = async (departmentId: string) => {
    const departmentState = selectedDepartmentsState.find(
      (department) => department.id === departmentId
    );
    if (!departmentState) return;

    if (departmentState.page >= selectedDepartmentTotalPage[departmentId] - 1)
      return;

    const { simpleBooths } = await getBooths(
      departmentId,
      departmentState.page + 1
    );

    setSelectedDepartmentsState((prevState) =>
      prevState.map((department) =>
        department.id === departmentId
          ? { ...department, page: department.page + 1 }
          : department
      )
    );

    setSelectedBoothListData((prevState) => {
      const updatedState = { ...prevState };
      updatedState[departmentId] = [
        ...updatedState[departmentId],
        ...simpleBooths,
      ];

      return updatedState;
    });
  };

  const fetchDepartmentBoothList = async (departmentId: string) => {
    const { simpleBooths, totalPage } = await getBooths(departmentId, 0);

    setSelectedBoothListData((prevState) => ({
      ...prevState,
      [departmentId]: simpleBooths,
    }));

    setSelectedDepartmentTotalPage((prevState) => ({
      ...prevState,
      [departmentId]: totalPage,
    }));
  };

  const onClickSelectDepartment = async (
    id: string,
    name: string,
    index: number
  ) => {
    setAllDepartmentsCheckState((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item
      )
    );

    setSelectedDepartmentsState((prev) => {
      const departmentInfo: SelectedBooths = { id, name, page: 0 };
      const existingIndex = prev.findIndex((item) => item.id === id);
      if (existingIndex !== -1) {
        return prev.filter((item) => item.id !== id);
      }
      return [...prev, departmentInfo];
    });

    await fetchDepartmentBoothList(id);
  };

  const resetCheckState = () => {
    if (setSelectedDepartmentsState.length > 0) {
      setAllDepartmentsCheckState((prevState) =>
        prevState.map((item) => ({ ...item, isChecked: false }))
      );
      setSelectedDepartmentsState([]);
    } else {
      setAllDepartmentsCheckState((prevState) =>
        prevState.map((item) => ({ ...item, isChecked: true }))
      );
      setSelectedDepartmentsState([]);
    }
  };

  const fetchInitialBoothData = async () => {
    const departmentBooths: { [key: string]: BoothInfo[] } = {};
    const fetchBoothId = allDepartmentsCheckState[0].id;

    const { simpleBooths } = await getBooths(fetchBoothId, currentPageNum);
    departmentBooths[fetchBoothId] = simpleBooths;
    setIsLoading(false);
    setCurrentPageNum(1);
    setIsInitialLoad(false);

    return departmentBooths;
  };

  const fetchNextPage = async () => {
    if (isLoading || fetchingBoothIndex >= allDepartmentsCheckState.length)
      return;
    setIsLoading(true);

    const departmentBooths: { [key: string]: BoothInfo[] } = {};
    const fetchBoothId = allDepartmentsCheckState[fetchingBoothIndex].id;

    const { simpleBooths, totalPage } = await getBooths(
      fetchBoothId,
      currentPageNum
    );

    departmentBooths[fetchBoothId] = simpleBooths;

    if (currentPageNum >= totalPage - 1) {
      setFetchingBoothIndex((prev) => prev + 1);
      setCurrentPageNum(0);
    } else {
      setCurrentPageNum((prev) => prev + 1);
    }

    setBoothListData((prevState) => {
      const updatedState = { ...prevState };

      if (updatedState[fetchBoothId]) {
        updatedState[fetchBoothId] = [
          ...updatedState[fetchBoothId],
          ...departmentBooths[fetchBoothId],
        ];
      } else {
        updatedState[fetchBoothId] = departmentBooths[fetchBoothId];
      }
      setIsLoading(false);
      return updatedState;
    });
  };

  useEffect(() => {
    if (allDepartmentsCheckState.length > 0) {
      fetchInitialBoothData();
    }
  }, [allDepartmentsCheckState.length]);

  useEffect(() => {
    if (
      !isInitialLoad &&
      inView &&
      allDepartmentsCheckState.length > 0 &&
      !isLoading
    ) {
      fetchNextPage();
    }
  }, [inView, allDepartmentsCheckState.length, isInitialLoad]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Wrapper>
      <Header />

      <Title>부스정보</Title>
      <P>
        각 대학별 부스정보를 한 눈에 쉽게 파악하고 즐겁게 <br />
        축제를 즐기세요!
      </P>
      <DepartmentsSelectBox>
        {allDepartmentsCheckState?.map(
          ({ id, name, categoryName, isChecked }, index) => (
            <Department
              key={id}
              role="button"
              $isChecked={isChecked}
              onClick={() => onClickSelectDepartment(id, name, index)}
            >
              {isChecked ? (
                <CheckedIcon width={24} />
              ) : (
                <UnCheckedIcon width={24} />
              )}
              <DepartmentName $isChecked={isChecked}>
                {categoryName}
              </DepartmentName>
            </Department>
          )
        )}
        <AllSelectButton
          $isChecked={selectedDepartmentsState.length > 0}
          onClick={() => resetCheckState()}
        >
          {selectedDepartmentsState.length > 0 ? `선택해제` : `전체선택`}
        </AllSelectButton>
      </DepartmentsSelectBox>

      <BoothList>
        {/* 선택된 값이 있는 경우 */}
        {selectedDepartmentsState?.map((booth) => (
          <BoothWrapper key={booth.id}>
            <DepartmentBooths key={booth.id}>
              <BoothName>{booth.name}</BoothName>
              {selectedBoothListData[booth.id]?.map(
                ({ id, name, description, imageUrl }) => (
                  <BoothBox key={id} onClick={() => navigate(`/booths/${id}`)}>
                    <TextBox>
                      <Name>{name}</Name>
                      <Description>{description}</Description>
                    </TextBox>
                    <Img src={imageUrl} alt="부스 이미지" />
                  </BoothBox>
                )
              )}
            </DepartmentBooths>
            {booth.page < selectedDepartmentTotalPage[booth.id] - 1 && (
              <Button
                type="button"
                onClick={() => fetchNextDepartmentBoothList(booth.id)}
              >
                {booth.name} 부스 더보기
              </Button>
            )}
          </BoothWrapper>
        ))}

        {/* 모두 선택되지 않은 경우 */}
        {selectedDepartmentsState.length < 1 &&
          allDepartmentsCheckState.map((booth) => (
            <BoothWrapper key={booth.id}>
              <DepartmentBooths>
                {boothListData[booth.id] && <BoothName>{booth.name}</BoothName>}
                {boothListData[booth.id]?.map(
                  ({ id, name, description, imageUrl }) => (
                    <BoothBox
                      key={id}
                      onClick={() => navigate(`/booths/${id}`)}
                    >
                      <TextBox>
                        <Name>{name}</Name>
                        <Description>{description}</Description>
                      </TextBox>
                      <Img src={imageUrl} alt="부스 이미지" />
                    </BoothBox>
                  )
                )}
              </DepartmentBooths>
              {!isLoading && <div ref={setRef} />}
            </BoothWrapper>
          ))}
      </BoothList>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
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
const AllSelectButton = styled.button<{ $isChecked: boolean }>`
  width: 88px;
  padding: 7px 3px;
  border-radius: 999px;
  background-color: ${({ theme, $isChecked }) =>
    $isChecked ? theme.colors.blue100 : '#E1EBF0'};
  color: ${({ theme, $isChecked }) =>
    $isChecked ? theme.colors.white100 : theme.colors.text500};
  ${({ theme }) => theme.typographies.footnote};
`;
const BoothName = styled.div`
  width: 200px;
  margin: 37px auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blue100};
  text-align: center;
  color: ${({ theme }) => theme.colors.blue100};
  ${({ theme }) => theme.typographies.title1};
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
  height: calc(100vh - 250px);
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
const Button = styled.button`
  margin: 0 auto;
  padding: 10px;
  display: block;
  ${({ theme }) => theme.typographies.callout};
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme }) => theme.colors.blue100};
  border-radius: 8px;
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
  width: 100%;
`;
const Name = styled.p`
  height: 34px;
  margin-bottom: 8px;
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
