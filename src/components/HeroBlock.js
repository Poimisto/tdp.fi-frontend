import React from "react";
import styled from "styled-components";
import { getContrast } from "polished";
import theme from "../theme";
import Background from "./Background";
import { Container } from "../templates/layout"; // <-- correct source for Container

// Don't forward styling-only props to the DOM
const StyledBlock = styled.div.withConfig({
  shouldForwardProp: (prop, defaultValidator) =>
    defaultValidator(prop) && prop !== "$bgColor",
})`
  color: ${({ theme, $bgColor }) =>
    getContrast(theme.colors.darkest, $bgColor || "#f3f3f3") > 10
      ? theme.colors.darkest
      : theme.colors.lightest};
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  position: relative;
  overflow: hidden;
  padding: 40px 20px;
  @media (max-width: ${({ theme }) => theme.mobileBreakpoint}px) {
    padding: 20px 10px;
  }
  box-sizing: border-box;

  h1, h2, h3, h4, h5, h6 { margin: 0; }

  /* Form theming inside hero */
  input[type="text"], textarea {
    color: ${({ theme, $bgColor }) =>
      getContrast(theme.colors.darkest, $bgColor || "#f3f3f3") > 10
        ? theme.colors.darkest
        : theme.colors.lightest};
  }

  .MuiFormLabel-root, .MuiFormControlLabel-label {
    color: ${({ theme, $bgColor }) =>
      getContrast(theme.colors.darkest, $bgColor || "#f3f3f3") > 10
        ? theme.colors.darkest
        : theme.colors.lightest};
    opacity: 0.8;
  }

  .MuiFormLabel-root { letter-spacing: 2px; }

  .MuiFilledInput-underline:after {
    border-color: ${({ theme, $bgColor }) =>
      getContrast(theme.colors.brand, $bgColor || "#f3f3f3") > 10
        ? theme.colors.brand
        : theme.colors.darkest};
  }

  .Mui-checked + .MuiFormControlLabel-label { opacity: 1; }

  .MuiIconButton-label svg {
    fill: ${({ theme, $bgColor }) =>
      getContrast(theme.colors.darkest, $bgColor || "#f3f3f3") > 10
        ? theme.colors.darkest
        : theme.colors.lightest};
    fill-opacity: 0.8;
  }

  .Mui-checked .MuiIconButton-label svg {
    fill-opacity: 1;
    fill: ${({ theme, $bgColor }) =>
      getContrast(theme.colors.brand, $bgColor || "#f3f3f3") > 10
        ? theme.colors.brand
        : theme.colors.darkest};
  }
`;

const HeroGrid = styled.div.withConfig({
  shouldForwardProp: (prop, defaultValidator) =>
    defaultValidator(prop) && !["$columns", "$imageAlign"].includes(prop),
})`
  display: grid;
  grid-template-columns: ${({ $columns }) =>
    "1fr ".repeat($columns || 2).trim()};
  grid-gap: 20px;

  @media (max-width: ${({ theme }) => theme.mobileBreakpoint}px) {
    grid-template-columns: 1fr;
  }

  .HeroBlockImage {
    order: ${({ $imageAlign }) => ($imageAlign === "left" ? 0 : 1)};
    @media (max-width: ${({ theme }) => theme.mobileBreakpoint}px) {
      order: 0;
    }
  }
`;

const HeroBlock = ({ children, bgColor, imageAlign = "right", columns = 2, ...props }) => {
  const bg = theme.colors[bgColor] || theme.colors.light;

  return (
    <StyledBlock $bgColor={bg} {...props}>
      <Background background={bg} />
      <Container>
        <HeroGrid $imageAlign={imageAlign} $columns={columns}>
          {children}
        </HeroGrid>
      </Container>
    </StyledBlock>
  );
};

export default HeroBlock;
