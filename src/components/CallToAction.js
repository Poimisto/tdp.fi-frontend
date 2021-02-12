import React from "react"
import PropTypes from "prop-types"

import Link from "./Link"

import styled from 'styled-components'
import { lighten, shade, getContrast } from 'polished'
import theme from './../theme';

const StyledLink = styled(Link)`
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  padding: 0.5em 2.5em;
  background-color: ${props => props.bgColor};
  color:${props => getContrast(props.theme.colors.darkest, props.bgColor) > 10 ? props.theme.colors.darkest : props.theme.colors.lightest };
  border: 1px solid ${props => shade(0.2, props.bgColor)};
  &:hover {
    background-color: ${props => lighten(0.03, props.bgColor)}
  }
`

const CallToAction = ({ url, children, align, bgColor, ...other }) => {
  
  const bg = theme.colors[bgColor] || theme.colors.dark;

  const link = (
    <StyledLink to={url} align={align} bgColor={bg}>
      {children}
    </StyledLink>
  )

  return align === "center" ? (
    <span style={{ display: "flex", justifyContent: "center" }}>{link}</span>
  ) : (
    link
  )
}

CallToAction.propTypes = {
  url: PropTypes.string.isRequired,
  align: PropTypes.string,
}
export default CallToAction
