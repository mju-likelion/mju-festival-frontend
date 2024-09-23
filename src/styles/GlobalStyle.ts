import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './font.css';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    font-family: "Pretendard Variable", Pretendard, sans-serif;
  }

  html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #e0e0e0;
  }

  body {
    background-color: #e0e0e0;
    overflow-x: hidden;
  }

  button {
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }

  input, textarea{
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    resize: none;
  }
  input:focus, textarea:focus {
    outline: none;
  }
`;

export default GlobalStyle;
