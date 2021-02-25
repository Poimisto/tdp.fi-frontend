import React from "react"
import PropTypes from "prop-types"

import {Container} from './../templates/layout';

import styled from 'styled-components'
import { getContrast } from 'polished'
import theme from './../theme';

import Grid from '@material-ui/core/Grid'

import Background from './Background'
import { StaticQuery, graphql, Link} from "gatsby"
import Img from "gatsby-image"

const StyledBlock = styled.div`
  color:${props => getContrast(props.theme.colors.darkest, props.bgColor || '#f3f3f3') > 10 ? props.theme.colors.darkest : props.theme.colors.lightest };
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  position:relative;
  overflow:hidden;
  padding:40px 20px;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    padding:20px 10px;

  }
  box-sizing:border-box;
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
  
  /*
    These should be refactored to to contact form
  */
  input[type="text"], textarea {
    color:${props => getContrast(props.theme.colors.darkest, props.bgColor || '#f3f3f3') > 10 ? props.theme.colors.darkest : props.theme.colors.lightest };
  }

  .MuiFormLabel-root, .MuiFormControlLabel-label  {
    color:${props => getContrast(props.theme.colors.darkest, props.bgColor || '#f3f3f3') > 10 ? props.theme.colors.darkest : props.theme.colors.lightest };
    opacity:0.8;
  }
  .MuiFormLabel-root {
    letter-spacing:2px;
  }

  .MuiFilledInput-underline:after {
    border-color:${props => getContrast(props.theme.colors.brand, props.bgColor || '#f3f3f3') > 10 ? props.theme.colors.brand : props.theme.colors.darkest };
  }
  .Mui-checked + .MuiFormControlLabel-label  {
    opacity:1;
  }
  .MuiIconButton-label svg {
    fill: ${props => getContrast(props.theme.colors.darkest, props.bgColor || '#f3f3f3') > 10 ? props.theme.colors.darkest : props.theme.colors.lightest };
    fill-opacity:0.8;
  }
  .Mui-checked .MuiIconButton-label svg {
    fill-opacity:1;
    fill:${props => getContrast(props.theme.colors.brand, props.bgColor || '#f3f3f3') > 10 ? props.theme.colors.brand : props.theme.colors.darkest };
  }

`
const HeroGrid = styled.div`
  display:grid;
  grid-template-columns: ${props => '1fr '.repeat(props.columns).trim() };
  grid-gap: 20px;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    grid-template-columns: 1fr;

  }
  .HeroBlockImage {
    order: ${props => props.imageAlign === 'left' ? 0 : 1};
    @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
      order: 0;
    }
  }

`;

const HeroBlock = ({ children, bgColor, imageAlign, columns, ...props }) => {
  
  const bg = theme.colors[bgColor] || theme.colors.light;

  return (
    <StyledBlock bgColor={bg} {...props}>
      <Background background={bg} />
      <Container >
        <HeroGrid imageAlign={imageAlign} columns={columns ? columns : 2}>
          {children}
        </HeroGrid>
        
      </Container>
    </StyledBlock>
  )
 
}
/*
CallToAction.propTypes = {
  url: PropTypes.string.isRequired,
  align: PropTypes.string,
}
*/
export default HeroBlock
