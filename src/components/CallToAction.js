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
  padding: 0.5em 1.5em 0.5em 1.5em; 
  background-color: ${props => props.bgColor};
  color:${props => getContrast(props.theme.colors.darkest, props.bgColor) > 10 ? props.theme.colors.darkest : props.theme.colors.lightest };
  border: 1px solid ${props => shade(0.2, props.bgColor)};
  &:hover {
    background-color: ${props => lighten(0.1, props.bgColor)};
    border: 1px solid ${props => shade(0.5, props.bgColor)};
  }
  cursor: pointer;
  margin: 4px 4px 0px 0px;

`

const CallToAction = ({ url, children, align, bgColor, ...other }) => {
  
  const bg = theme.colors[bgColor] || theme.colors.dark;

  const link = (
    <StyledLink to={url} align={align} bgColor={bg} className="call-to-action" {...other}>
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
