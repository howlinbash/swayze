import styled from "styled-components";

interface Props {
  border?: string;
  center?: boolean;
  pd?: string;
  h?: string;
  w?: string;
  gtr?: string;
  gtc?: string;
  // onClick?: () => void;
}

const Frame = styled.div<Props>`
  display: grid;
  grid-gap: 1.5vmin;
  border-radius: 1.5vmin;
  background-color: ${({ color }) => color};
  ${({ border }) => border && `border: 2px solid ${border}`};
  ${({ center }) => center && "place-items: center"};
  ${({ pd }) => pd && `padding: ${pd}`};
  ${({ h }) => h && `height: ${h}`};
  ${({ w }) => w && `width: ${w}`};
  ${({ gtr }) => gtr && `grid-template-rows: ${gtr}`};
  ${({ gtc }) => gtc && `grid-template-columns: ${gtc}`};
`;

export default Frame;
