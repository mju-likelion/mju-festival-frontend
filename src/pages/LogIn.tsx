import styled from 'styled-components';
import { useState } from 'react';
import { JSEncrypt } from 'jsencrypt';

const LogIn = () => {
  const [value, setValue] = useState('');

  const publicKey = import.meta.env.VITE_DUMMY_PUBLICKEY;

  const encrypt = () => {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encryptValue = encrypt();
    console.log(encryptValue);
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input onChange={(e) => setValue(e.target.value)} />
        <Button>로그인</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
const Form = styled.form`
  width: 300px;
  margin: 200px auto;
  border: 1px solid black;
`;
const Input = styled.input``;
const Button = styled.button``;
export default LogIn;
