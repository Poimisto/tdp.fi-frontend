import React from 'react'
import styled from 'styled-components'

const StyledH1 = styled.h1`
  font-family ${props => props.theme.headingFontFamily};
  line-height:160%;
  font-size:2.5em;
`;

const StyledH2 = styled.h2`
  font-family ${props => props.theme.headingFontFamily};
  line-height:160%;
  font-size:1.4em;
`;

const StyledH3 = styled.h3`
  font-family ${props => props.theme.headingFontFamily};
  line-height:160%;
  font-size:1.3em;
`;

const StyledH4 = styled.h4`
  font-family ${props => props.theme.headingFontFamily};
  line-height:160%;
  font-size: 1.1em;
`;

const StyledH5 = styled.h5`
  font-family ${props => props.theme.headingFontFamily};
  line-height:160%;
  font-size: 1.1em;
`;

const StyledH6 = styled.h6`
  font-family ${props => props.theme.headingFontFamily};
  line-height:160%;
  font-size: 1.1em;
`;

export const createAnchor = (heading) => {
  if (Array.isArray(heading)) {
    heading = heading.map(i => {
      if (typeof i === 'string') {
        return i
      } else if (typeof i === 'object') {
        return i.props.children
      }
    }).join('');
  } else if (typeof heading === 'object') {
    heading = heading.props.children
  }

  return heading.toLowerCase().replaceAll(/[^\p{L}\p{N} \-]+/gu, '').replaceAll(/[ ]/g, '-')
}

export const H1 = props => {
  const anchor = createAnchor(props.children)
  return <StyledH1 {...props} id={anchor}>{props.children}</StyledH1>
}

export const H2 = props => {
  const anchor = createAnchor(props.children)
  return <StyledH2 {...props} id={anchor}>{props.children}</StyledH2>
}

export const H3 = props => {
  const anchor = createAnchor(props.children)
  return <StyledH3 {...props} id={anchor}>{props.children}</StyledH3>
}

export const H4 = props => {
  const anchor = createAnchor(props.children)
  return <StyledH4 {...props} id={anchor}>{props.children}</StyledH4>
}

export const H5 = props => {
  const anchor = createAnchor(props.children)
  return <StyledH5 {...props} id={anchor}>{props.children}</StyledH5>
}

export const H6 = props => {
  const anchor = createAnchor(props.children)
  return <StyledH6 {...props} id={anchor}>{props.children}</StyledH6>
}