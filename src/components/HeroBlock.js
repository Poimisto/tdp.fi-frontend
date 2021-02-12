import React from "react"
import PropTypes from "prop-types"

import {Container} from './../templates/layout';

import styled from 'styled-components'
import { getContrast } from 'polished'
import theme from './../theme';

import Background from './Background'

const StyledBlock = styled.div`
  color:${props => getContrast(props.theme.colors.darkest, props.bgColor || '#f3f3f3') > 10 ? props.theme.colors.darkest : props.theme.colors.lightest };
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  position:relative;
  overflow:hidden;
  padding:40px 20px;
  box-sizing:border-box;

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`

const HeroBlock = ({ children, bgColor, animate, ...other }) => {
  
  const bg = theme.colors[bgColor] || theme.colors.light;

  return (
    <StyledBlock bgColor={bg}>
      <Background background={bg} />
      <Container >
        {children}
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
