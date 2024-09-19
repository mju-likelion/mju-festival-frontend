import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoothDepartments, getBooths } from '../../api/booth.ts';
import { BoothInfo, CheckState } from '../../types';
import { ReactComponent as CheckedIcon } from '../../assets/icons/booth-checked.svg';
import { ReactComponent as UnCheckedIcon } from '../../assets/icons/booth-un-checked.svg';

const BoothPage = () => {
  // 전체 카테고리의 선택 상태 및 정보를 저장
  const [checkState, setCheckState] = useState<CheckState[]>([]);
  // 현재 선택된 부스 id 들을 저장
  const [selectedDepartmentIdArr, setSelectedDepartmentIdArr] = useState<
    string[]
  >([]);
  // booth 정보(API response)를 저장
  const [boothListData, setBoothListData] = useState<
    Record<string, BoothInfo[]>
  >({});
  const navigate = useNavigate();

  const fetchDepartmentBoothListData = async () => {
    const allBoothData = await Promise.all(
      checkState?.map(async (department) => {
        const booths = await getBooths(department.id);
        return { [department.id]: booths };
      })
    );

    const groupedBoothData = allBoothData.reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});

    setBoothListData(groupedBoothData);
  };

  const fetchData = async () => {
    const departments = await getBoothDepartments();
    const initialCheckState = departments.map((department) => ({
      ...department,
      isChecked: false,
    }));
    setCheckState(initialCheckState);
  };

  const onClick = (id: string, index: number) => {
    setCheckState((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item
      )
    );
    setSelectedDepartmentIdArr((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const resetCheckState = () => {
    if (selectedDepartmentIdArr.length > 0) {
      setCheckState((prevState) =>
        prevState.map((item) => ({ ...item, isChecked: false }))
      );
      setSelectedDepartmentIdArr([]);
    } else {
      setCheckState((prevState) =>
        prevState.map((item) => ({ ...item, isChecked: true }))
      );
      const allDepartmentId = Object.keys(boothListData);

      setSelectedDepartmentIdArr(allDepartmentId);
    }
  };

  useEffect(() => {
    if (selectedDepartmentIdArr.length < 1) {
      fetchDepartmentBoothListData();
    }
  }, [checkState, selectedDepartmentIdArr]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Wrapper>
      <button type="button" onClick={() => navigate('/')}>
        뒤로가기
      </button>
      <Title>부스정보</Title>
      <P>
        각 대학별 부스정보를 한 눈에 쉽게 파악하고 즐겁게 <br />
        축제를 즐기세요!
      </P>
      <DepartmentsSelectBox>
        {checkState?.map(({ id, categoryName, isChecked }, index) => (
          <Department
            key={id}
            role="button"
            $isChecked={isChecked}
            onClick={() => onClick(id, index)}
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
        ))}
        <AllSelectButton
          $isChecked={selectedDepartmentIdArr.length > 0}
          onClick={() => resetCheckState()}
        >
          {selectedDepartmentIdArr.length > 0 ? `선택해제` : `전체선택`}
        </AllSelectButton>
      </DepartmentsSelectBox>

      <BoothList>
        {checkState?.map(
          (booth) =>
            booth.isChecked && (
              <DepartmentBooths key={booth.id}>
                <BoothName>{booth.name}</BoothName>
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
            )
        )}
        {selectedDepartmentIdArr.length < 1 &&
          checkState.map((booth) => (
            <DepartmentBooths key={booth.id}>
              <BoothName>{booth.name}</BoothName>
              {boothListData[booth.id]?.map(
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
