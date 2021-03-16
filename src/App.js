import React from "react";
import { createGlobalStyle } from "styled-components";
import { Layout } from "./ui";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Impact';
    font-style: normal;
    font-weight: normal;
    src:
      local('Impact'),
      local('Impact'),
      url('./fonts/impact.ttf')
      format('truetype');
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Impact, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Layout />
    </>
  );
};

export default App;
