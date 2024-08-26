import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import Header from './Header';

const CreateLostItem = () => {
  const [imgFile, setImgFile] = useState<FileList>();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = () => {
    // 임시 console
    console.log(imgFile);
  };

  const handleImgFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgFile(e.target.files);
    }
  };

  return (
    <Wrapper>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ItemLayout>
          <RegisterDate>등록일 </RegisterDate>
          <ItemImg {...register('file')} type="file" onChange={handleImgFile} />
          <ItemTitle {...register('title')} placeholder="제목" />
          <ItemContent {...register('content')} placeholder="test 내용" />
        </ItemLayout>
        <button type="submit">등록하기</button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid red;
`;

const ItemLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
const RegisterDate = styled.p``;
const ItemImg = styled.input`
  width: 100%;
  height: 200px;
`;
const ItemTitle = styled.input``;
const ItemContent = styled.textarea`
  width: 100%;
  background-color: #cccfde;
`;

export default CreateLostItem;
