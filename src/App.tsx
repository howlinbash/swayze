import React from "react";
import { createGlobalStyle } from "styled-components";
import { Layout } from "./ui";
import "./font.css";

const GlobalStyle = createGlobalStyle`
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
