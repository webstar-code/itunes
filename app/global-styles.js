import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import 'antd/dist/antd.less';
  html,
  body {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
  }

  body {
    font-family:  sans-serif;
  }

  body.fontLoaded {
    font-family:  sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  span,
  button,
  label {
    font-family: sans-serif;
    line-height: 1.5em;
    margin-bottom: 0;
  }
`;

export default GlobalStyle;
