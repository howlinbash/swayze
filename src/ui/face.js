import React from "react";
import styled from "styled-components";

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  margin: -4vmin;
`;

const Face = ({ face, id }) => {
  return <Img src={face} style={{ display: "" }} />
};

export default Face;
