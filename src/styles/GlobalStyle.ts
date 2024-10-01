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
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 1000px inset transparent;
      box-shadow: 0 0 0 1000px inset transparent;
      transition: background-color 5000s ease-in-out 0s;
  }
`;

export default GlobalStyle;
