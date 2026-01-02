import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "./../theme";
import { Link } from "gatsby";
import Grid from "@mui/material/Grid";
import Navigation from "./../components/Navigation";
import { lighten } from "polished";

/* avoid "require" with Webpack 5 when importing */
import logo60 from "../images/tdp-logo-2022-60x60.png";
import logo120 from "../images/tdp-logo-2022-120x120.png";
import badgeAAA from "../images/AAA-logo-2025-FI-transparent.png";
import badgeLuotettava from "../images/luotettavakumppani_250x124.jpg";
import badgeSY from "../images/sy-jasenyritysbanneri-fi_250x124.jpg";
import badgeAsiakastieto from "../images/STANDING_BLACK_1080x952.png";

const Main = styled.div``;

const Header = styled.header`
  background: ${p => p.theme.colors.dark};
  color: ${p => p.theme.colors.dark};
  a { color: ${p => p.theme.colors.lightest}; }
  padding: 6px 0;
`;

export const Container = styled.div`
  max-width: ${p => p.theme.containerMaxWidth}px;
  margin: 0 auto;
  @media (max-width: ${p => p.theme.containerMaxWidth + 20}px) {
    padding: 0 10px;
  }
`;

const LogoImage = styled.img`
  margin-top: 6px;
  height: 48px;
  width: auto;
  display: block;
`;

const NavGridContainer = styled(Grid)`
  display: flex !important;
  flex-direction: row !important;
  flex-flow: row wrap !important;
  justify-content: space-between !important;
  align-items: center !important;
`;

const Footer = styled.div`
  background: ${p => p.theme.colors.lightest};
  color: ${p => p.theme.colors.dark};
  padding: 20px 0;

  .footerContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .badgeList {
    margin-bottom: 10px;
    @media (max-width: ${p => p.theme.mobileBreakpoint}px) {
      width: 100%;
      text-align: center;
      align-self: center;
    }
    img { margin: 5px; }
  }
  .footerLinks { margin-top: 20px; }
`;

const BadgeImage = styled.img`
  width: 120px;
  margin: 0 auto;
`;

const BreadcrumbTrail = styled.div`
  background: ${p => lighten(0.2, p.theme.colors.brand)};
  padding: 10px 0;
  .item {
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .item:not(:last-child):after {
    letter-spacing: 5px;
    content: " / ";
  }
  @media (max-width: ${p => p.theme.mobileBreakpoint}px) {
    * { font-size: 90%; }
    padding: 4px 0;
  }
`;

export default function Layout({ children, breadcrumb }) {
  return (
    <ThemeProvider theme={theme}>
      <Header>
        <Container>
          <NavGridContainer container>
            <Grid>
              <Link to="/">
                <LogoImage src={logo60} alt="TDP Logo" />
              </Link>
            </Grid>
            <Grid>
              <Navigation />
            </Grid>
          </NavGridContainer>
        </Container>
      </Header>

      {breadcrumb && (
        <BreadcrumbTrail>
          <Container>
            {breadcrumb.map((item, idx) =>
              !item.path ? (
                <span className="item" key={idx}>{item.label}</span>
              ) : (
                <span className="item" key={idx}>
                  <a href={item.path}>{item.label}</a>
                </span>
              )
            )}
          </Container>
        </BreadcrumbTrail>
      )}

      <Container id="pagecontainer">
        <Main>{children}</Main>
      </Container>

      <Footer>
        <Container className="footerContainer">
          <div className="footerLogo">
            <img src={logo120} alt="TDP" />
          </div>

          <div className="footerBullets">
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>Yritysten tietotekniikan kumppani</li>
              <li>Myynti: myynti@tdp.fi</li>
              <li>Tuki: tuki@tdp.fi</li>
              <li>010-2921640</li>
            </ul>
          </div>

          <div className="badgeList">
            <BadgeImage src={badgeAAA} alt="AAA-luottoluokitus" />
            <BadgeImage src={badgeLuotettava} alt="Luotettava kumppani" />
            <BadgeImage src={badgeSY} alt="Suomen yrittäjät jäsenyritys" />
            <BadgeImage src={badgeAsiakastieto} alt="Asiakastieto" />
          </div>

          <div className="longDescription">
            Tampereen Datapiste on yritysten IT-kumppani. Toimipisteemme
            sijaitsevat Nokialla ja Helsingissä. Päätoimialueemme on Pirkanmaa
            (Tampere, Kangasala, Lempäälä, Nokia, Pirkkala, Ylöjärvi) sekä
            Helsinki ja muu pääkaupunkiseutu. Valikoimaamme kuuluvat IT-tuki,
            IT-palvelut, pilvipalvelut ja IT-leasing. Noudatamme palveluissa IT
            2022 sopimusehtoja ja toteutamme luotettavat IT-ratkaisut
            yrityksille ammattitaidolla.
          </div>

          <div className="footerLinks">
            <a href="/yhteystiedot">Yhteystiedot</a> |{" "}
            <a href="/assets/laskutustiedot.pdf">Laskutustiedot</a> |{" "}
            <a href="/yritys/hinnasto">Palveluhinnasto</a> |{" "}
            <a href="/assets/tietosuojaseloste.pdf" target="_blank" rel="noreferrer">
              Tietosuojaseloste
            </a>{" "}
            | <a href="/tuki">Tuki</a>
          </div>
        </Container>
      </Footer>
    </ThemeProvider>
  );
}
