
import React from "react"

import styled, {ThemeProvider} from 'styled-components';
import theme from './../theme'
import {Link} from 'gatsby';

import Grid from '@material-ui/core/Grid'

import Navigation from './../components/Navigation'

const Main = styled.div``;

const Footer = styled.div`
  border-top:1px solid ${props => props.theme.colors.darkest};
  background: ${props => props.theme.colors.darkest};
  color: ${props => props.theme.colors.light};
  margin-top: 2rem;
  padding:5rem;
`;
const Header = styled.header`
  background: ${props => props.theme.colors.lightest};
  color: ${props => props.theme.colors.dark};
  a {
    color: ${props => props.theme.colors.dark}
  }
  padding:30px 0px;
`;
export const Container = styled.div`
  max-width: ${props => props.theme.containerMaxWidth}px;
  margin: 0 auto;
  @media (max-width: ${props => (props.theme.containerMaxWidth + 20)}px) {
    padding: 0 20px;
  }
`;

const LogoImage = styled.img`
  max-width:120px;
  margin-top:6px;
`;
const NavGridContainer = styled(Grid)`
  display:flex;
  flex-direction: row;
  flex-flow: row wrap;
  justify-content: space-between;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    flex-direction:column;
    justify-content: center;
    align-items:center;
    text-align:center;
    margin:0 -20px;
  }
`

export default ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <Header>
        <Container> 
          <NavGridContainer>
            <Grid item>
              <Link to="/">
                <LogoImage src={require('../images/poimisto-logo.png')} alt="Logo" />
              </Link>
            </Grid>
            <Grid item>
              <Navigation/>
            </Grid>
          </NavGridContainer>
        </Container>
      </Header>
      
      <Container>
        <Main>
          {children}
        </Main>
      </Container>
      <Footer>
        <Container>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </Container>  
      </Footer>
    </ThemeProvider>

  )
}