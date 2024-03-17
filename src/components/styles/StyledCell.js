import styled from "styled-components";

export const StyledCell = styled.div`
  width: auto;
  border-radius: 6px;
  background: rgba(${(props) => (props.ghost ? "white" : props.color)}, 0.8);
  margin: 0.5px;
  border: ${(props) => (props.ghost ? "2px solid" : "")};
  border-color: rgba(${(props) => props.color}, 0.8);
`;

export const HiddenCell = styled.div`
  width: auto;
  border-radius: 6px;
  margin: 0.5px;
`;
