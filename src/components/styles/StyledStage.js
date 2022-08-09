import styled from 'styled-components'

export const StyledStage = styled.div`
  padding: 20px 20px;
  border-radius: 20px;
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(
      ${(props) => (props.type === 'main' ? '240px' : '96px')} /
        ${(props) => props.width}
    )
  );
  /* border: 4px solid #303942; */
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  width: ${(props) => (props.type === 'main' ? '240px' : '96px')};
  margin: 0px 20px;
  background: ${(props) => props.theme.backgroundColor};
`
