import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getBoothDepartments, getBooths } from '../../api/booth.ts';
import { ReactComponent as CheckedIcon } from '../../assets/icons/booth-checked.svg';
import { ReactComponent as UnCheckedIcon } from '../../assets/icons/booth-un-checked.svg';
import Header from '../../components/Header.tsx';
import { BoothDepartment, BoothInfo, FetchBoothListParams } from '../../types';

const BoothPage = () => {
  const [departmentList, setDepartmentList] = useState<BoothDepartment[]>([]);
  const [selectedBoothListData, setSelectedBoothListData] = useState<
    Record<string, BoothInfo[]>
  >({});
  const [currentDepartment, setCurrentDepartment] =
    useState<FetchBoothListParams>({
      id: '',
      currentPage: 0,
      isLastPage: false,
    });

  const [isLoading, setIsLoading] = useState(false);
  const [hasFetchedInitialData, setHasFetchedInitialData] = useState(false);

  const { ref, inView } = useInView();
  const setRef = ref as React.RefCallback<HTMLDivElement>;

  const navigate = useNavigate();

  const fetchData = async () => {
    const departments = await getBoothDepartments();
    setDepartmentList(departments);
    setCurrentDepartment({
      id: departments[0].id,
      currentPage: 0,
      isLastPage: false,
    });
    await fetchInitialData(departments[0].id);
  };

  const fetchInitialData = async (id: string) => {
    setIsLoading(true);
    const { simpleBooths, totalPage } = await getBooths(id, 0);
    setSelectedBoothListData({
      [id]: simpleBooths,
    });

    if (currentDepartment.currentPage + 1 >= totalPage) {
      setCurrentDepartment({ id, currentPage: 0, isLastPage: true });
    } else {
      setCurrentDepartment({ id, currentPage: 1, isLastPage: false });
    }

    setHasFetchedInitialData(true);
    setIsLoading(false);
  };

  const fetchNextDepartmentBoothList = async (id: string) => {
    setIsLoading(true);
    if (currentDepartment.isLastPage || !hasFetchedInitialData || isLoading) {
      return;
    }

    const { simpleBooths, totalPage } = await getBooths(
      id,
      currentDepartment.currentPage
    );
    if (currentDepartment.currentPage + 1 >= totalPage) {
      setCurrentDepartment({ id, currentPage: 0, isLastPage: true });
    }
    setCurrentDepartment((prevState) => ({
      ...prevState,
      currentPage: prevState.currentPage + 1,
    }));

    setSelectedBoothListData((prevState) => {
      const updatedState = { ...prevState };
      if (!Array.isArray(updatedState[id])) {
        updatedState[id] = [];
      }
      updatedState[id] = [...updatedState[id], ...simpleBooths];
      return updatedState;
    });
    setIsLoading(false);
  };

  const onClickSelectDepartment = async (id: string) => {
    setHasFetchedInitialData(false);
    setCurrentDepartment({ id, currentPage: 0, isLastPage: false });
    await fetchInitialData(id);
  };

  useEffect(() => {
    if (inView && !isLoading && hasFetchedInitialData) {
      fetchNextDepartmentBoothList(currentDepartment.id);
    }
  }, [inView, isLoading, currentDepartment.id]);

  useEffect(() => {
    fetchData();
  }, []);

  const currentDept = departmentList.find(
    (department) => department.id === currentDepartment.id
  );

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
            $isChecked={currentDepartment.id === id}
            onClick={() => onClickSelectDepartment(id)}
          >
            {currentDepartment.id === id ? (
              <CheckedIcon width={24} />
            ) : (
              <UnCheckedIcon width={24} />
            )}
            <DepartmentName $isChecked={currentDepartment.id === id}>
              {categoryName}
            </DepartmentName>
          </Department>
        ))}
      </DepartmentsSelectBox>

      <BoothList>
        <BoothWrapper>
          <DepartmentBooths>
            {currentDepartment.id && <BoothName>{currentDept?.name}</BoothName>}
            {selectedBoothListData[currentDepartment.id]?.map(
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
          {!isLoading && <div ref={setRef} />}
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
