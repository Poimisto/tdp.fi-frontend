
import React from "react"

import styled, {ThemeProvider} from 'styled-components';
import theme from './../theme'
import {Link} from 'gatsby';

import Grid from '@material-ui/core/Grid'

import Navigation from './../components/Navigation'
import {lighten} from 'polished';

const Main = styled.div``;


const Header = styled.header`
  background: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.dark};
  a {
    color: ${props => props.theme.colors.lightest}
  }
  padding:6px 0px;
`;
export const Container = styled.div`
  max-width: ${props => props.theme.containerMaxWidth}px;
  margin: 0 auto;
  @media (max-width: ${props => (props.theme.containerMaxWidth + 20)}px) {
    padding: 0 10px;
  }
`;

const LogoImage = styled.img`
  margin-top:6px;
`;
const NavGridContainer = styled(Grid)`
  display:flex;
  flex-direction: row;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items:center;
`

const Footer = styled.div`
  background: ${props => props.theme.colors.lightest};
  color: ${props => props.theme.colors.dark};
  padding:20px 0;
  .footerContainer {
    display:flex;
    flex-wrap: wrap;
    justify-content:space-between;
    align-items:center;
  }
  .footerLogo {  }
  .footerBullets {  }
  .badgeList {
    margin-bottom:10px;
    @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
      width: 100%;
      text-align:center;
      align-self: center;
    }
    img {
      margin:5px;
      @media (max-width: ${props => props.theme.mobileBreakpoint}px) {   }
    }
  }

  .longDescription { }
  .footerLinks { 
    margin-top:20px;
  }
`;
const BadgeImage = styled.img`
  width:120px;
  margin:0 auto;
`;

const BreadcrumbTrail = styled.div`
  background: ${props => lighten(0.2, props.theme.colors.brand)};
  padding:10px 0;
  .item {
    text-transform:uppercase;
    letter-spacing: 1px;
    a {    }
  }
  .item:not(:last-child):after {
    letter-spacing: 5px;
    content: " / ";
  }
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    * {
      font-size: 90%;
    }
    padding: 4px 0;
  }
`;


export default ({children, breadcrumb}) => {
  return (
    <ThemeProvider theme={theme}>
      <Header>
        <Container> 
          <NavGridContainer container>
            <Grid item>
              <Link to="/">
                <LogoImage src={require('../images/tdp-logo-2022-60x60.png')} alt="TDP Logo" />
              </Link>
            </Grid>
            <Grid item>
              <Navigation/>
            </Grid>
          </NavGridContainer>
        </Container>
      </Header>
      {breadcrumb && (
        <BreadcrumbTrail>
          <Container>
            {breadcrumb.map((item) => {
              if (!item.path) return ( 
                <span className="item">{item.label}</span>
              )
              else return (
                <span className="item"><a href={item.path}>{item.label}</a></span>
              )
            })}
          </Container>
        </BreadcrumbTrail>
      )}
      <Container id="pagecontainer">
        <Main>
          {children}
        </Main>
      </Container>
      <Footer>
        <Container className="footerContainer">
            <div className="footerLogo">
              <img src={require('./../images/tdp-logo-2022-120x120.png')} />
            </div>
            <div className="footerBullets">
              <ul style={{listStyleType:'none',padding:0}}>
                <li>Yritysten tietotekniikan kumppani</li>
                <li>Myynti: myynti@tdp.fi</li>
                <li>Tuki: tuki@tdp.fi</li>
                <li>010-2921640</li>
              </ul>
            </div>
            <div className="badgeList">

              <BadgeImage src={require('./../images/AAA-logo-2025-FI-transparent.png')} alt="AAA-luottoluokitus"/>
              <BadgeImage src={require('./../images/luotettavakumppani_250x124.jpg')} alt="Luotettava kumppani" />
              <BadgeImage src={require('./../images/sy-jasenyritysbanneri-fi_250x124.jpg')} alt="Suomen yrittäjät jäsenyritys" />
              <BadgeImage src={require('./../images/STANDING_BLACK_1080x952.png')} alt="Asiakastieto"/>
            </div>
            <div className="longDescription">
              Tampereen Datapiste on yritysten IT-kumppani. Toimipisteemme sijaitsevat Nokialla ja Helsingissä. Päätoimialueemme on Pirkanmaa (Tampere, Kangasala, Lempäälä, Nokia, Pirkkala, Ylöjärvi) sekä Helsinki ja muu pääkaupunkiseutu. Valikoimaamme kuuluvat IT-tuki, IT-palvelut, pilvipalvelut ja IT-leasing. Noudatamme palveluissa IT 2022 sopimusehtoja ja toteutamme luotettavat IT-ratkaisut yrityksille ammattitaidolla.
            </div>
            <div className="footerLinks">
              <a href="/yhteystiedot">Yhteystiedot</a> | <a href="/assets/laskutustiedot.pdf">Laskutustiedot</a> | <a href="/yritys/hinnasto">Palveluhinnasto</a> | <a href="/assets/tietosuojaseloste.pdf" target="_blank">Tietosuojaseloste</a>   | <a href="/tuki">Tuki</a>  
            </div>
        </Container>  
      </Footer>
    </ThemeProvider>

  )
}
