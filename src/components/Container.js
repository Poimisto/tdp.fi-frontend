// src/components/Container.js
import styled from "styled-components";

const Container = styled.div`
  max-width: ${p => p.theme.containerMaxWidth}px;
  margin: 0 auto;

  @media (max-width: ${p => p.theme.containerMaxWidth + 20}px) {
    padding: 0 10px;
  }
`;

export default Container;
