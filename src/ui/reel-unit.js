import React from "react";
import styled from "styled-components";
import Reel from "./reel";

const Unit = styled.div`
  border: 2px solid gold;
  background-color: brown;
  border-radius: 1.5vmin;
  padding: 1.5vmin;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1.5vmin;
`;

const ReelUnit = ({ answer, requestStartSpin, faces }) => {
  const focus = "";
  const isSpinning = false;
  const windows = [
    {id: "alpha"},
    {id: "beta"},
    {id: "charlie"}
  ];

  return (
    <Unit>
      {windows.map(({id}) => (
        <Reel
          answer={answer}
          face={faces[id]}
          focus={focus}
          id={id}
          isSpinning={isSpinning}
          key={id}
        />
      ))}
    </Unit>
  );
};

export default ReelUnit;
