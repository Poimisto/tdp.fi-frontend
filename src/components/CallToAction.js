import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { lighten, shade, getContrast } from "polished";

import Link from "./Link";
import theme from "./../theme";

// Use transient props ($bg / $align) so they don't get forwarded to <a>/<Link>
const StyledLink = styled(Link)`
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  padding: 0.5em 1.5em;
  background-color: ${(p) => p.$bg};
  color: ${(p) =>
    getContrast(p.theme.colors.darkest, p.$bg) > 10
      ? p.theme.colors.darkest
      : p.theme.colors.lightest};
  border: 1px solid ${(p) => shade(0.2, p.$bg)};
  &:hover {
    background-color: ${(p) => lighten(0.1, p.$bg)};
    border: 1px solid ${(p) => shade(0.5, p.$bg)};
  }
  cursor: pointer;
  margin: 4px 4px 0 0;
  text-align: ${(p) =>
    p.$align === "center" ? "center" : p.$align === "right" ? "right" : "left"};
`;

const CallToAction = ({ url = "#", children, align = "left", bgColor, ...other }) => {
  // Allow either a theme color key or a raw CSS color value
  const bg = theme.colors[bgColor] || bgColor || theme.colors.dark;

  const link = (
    <StyledLink
      to={url}
      $align={align}
      $bg={bg}
      className="call-to-action"
      {...other}
    >
      {children}
    </StyledLink>
  );

  if (align === "center") {
    return (
      <span style={{ display: "flex", justifyContent: "center" }}>{link}</span>
    );
  }
  if (align === "right") {
    return (
      <span style={{ display: "flex", justifyContent: "flex-end" }}>{link}</span>
    );
  }
  return link;
};

CallToAction.propTypes = {
  url: PropTypes.string, // default "#"
  align: PropTypes.oneOf(["left", "center", "right"]),
  bgColor: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CallToAction;
