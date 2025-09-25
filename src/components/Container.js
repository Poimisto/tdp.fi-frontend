// src/components/Container.js
//this is simply because of "circle import error" that occured during the upgrade and not sure if actually needed anymore

import styled from "styled-components";

const Container = styled.div`
  max-width: ${p => p.theme.containerMaxWidth}px;
  margin: 0 auto;

  @media (max-width: ${p => p.theme.containerMaxWidth + 20}px) {
    padding: 0 10px;
  }
`;

export default Container;
