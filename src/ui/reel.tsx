import React, {MouseEventHandler} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Frame } from "../design";
import faces, { question } from "../faces";
import { peek } from "../machine";
import {ReduxState} from "../reducers";
import { getIsRevealed } from "../selectors";

const Container = styled(Frame)`
  position relative;
  :active {
    border: 2px solid black;
    background-color: lightblue;
  }
`;
const Div = styled.div`
  position absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
`;

const Img = styled.img<{ hide: boolean }>`
  max-height: 100%;
  width: 100%;
  object-fit: contain;
  ${({ hide }) => hide && "opacity: 0"};
`;

interface Props {
  face: number;
  focus: boolean;
  id: number;
  isSpinning: boolean;
}

const Reel = ({ face, focus, id, isSpinning }: Props) => {
  const isRevealed = useSelector((state: ReduxState) => getIsRevealed(state, id));

  return (
    <Container
      border="black"
      center
      color="pink"
      key={id}
      onClick={isRevealed ? () => {} : peek(id) as MouseEventHandler<HTMLDivElement>}
      pd="0.8vmin"
    >
      <Div>
        <Img
          id={String(id)}
          hide={!!(isSpinning || isRevealed)}
          src={question}
        />
      </Div>
      <Div>
        <Img
          id={String(id)}
          hide={!isSpinning || !focus}
          src={faces[0]}
        />
      </Div>
      <Div>
        <Img
          id={String(id)}
          hide={!isRevealed}
          src={faces[face]}
        />
      </Div>
    </Container>
  );
};

export default Reel;
