import React from "react";
import { graphql } from "gatsby";
import Layout from "./layout";
import { MDXProvider } from "@mdx-js/react";
// ⛔️ No MDXRenderer import — new runtime injects content as `children`

import CallToAction from "./../components/CallToAction";
import Link from "../components/Link";
import Seo from "../components/Seo";
import HeroBlock from "../components/HeroBlock";
import Cards from "../components/Cards";
import Img from "gatsby-image";
import styled, { createGlobalStyle } from "styled-components";
import LatestPosts from "./../components/LatestPosts";
import ListOfEmployees from "../components/ListOfEmployees";
import ListOfLeasingPackages from "../components/ListOfLeasingPackages";
import Button from "@mui/material/Button";
import { getContrast } from "polished";
import Grid from "@mui/material/Grid";
import ContactForm from "./../components/ContactForm";
import NewsletterForm from "../components/NewsletterForm";
import SupportPricingCalculator from "../components/SupportPricingCalculator";
import DisplayVariable from "../components/DisplayVariable";
import TableOfContents from "../components/TableOfContents";
import YoutubeWrapper from "../components/YoutubeWrapper";
import LeasingCalculator from "../components/LeasingCalculator";

import {
  H1 as h1,
  H2 as h2,
  H3 as h3,
  H4 as h4,
  H5 as h5,
  H6 as h6,
} from "../components/Headings";

/* ---------------- global styles ---------------- */
const GlobalStyle = createGlobalStyle`
  * { text-decoration:none; font-family:${p=>p.theme.bodyFontFamily}; line-height:180%; font-size:16px; }
  html { scroll-behavior:smooth; }
  body { overflow-x:hidden; padding:0; margin:0; }
  a { text-decoration:none; color:${p=>p.theme.colors.link}; }
  button { text-decoration:none; }
  blockquote { font-style:italic; }
  blockquote:before { content:"”"; float:left; display:block; font-size:92px; margin:30px 0 0 -50px; }
  h1,h2,h3,h4,h5,h6 { font-family:${p=>p.theme.headingFontFamily}; line-height:160%; }
  h1 { font-size:2.5em; } h2 { font-size:1.4em; } h3 { font-size:1.3em; } h4,h5,h6{ font-size:1.1em; }
  @media (max-width:${p=>p.theme.mobileBreakpoint}px){ h1{ font-size:1.6em; } }
  font-size:${p=>p.theme.fontSize};
  line-height:${p=>p.theme.bodyLineHeight};
  table { width:100%; margin-bottom:40px; }
  table td { padding:8px; }
  table :nth-child(odd) td { background:#f3f3f3; }
`;

/* ---------------- layout bits ---------------- */
const ArticleContainer = styled.div`
  width:100%; height:fit-content; display:flex; flex-direction:column;
  @media (max-width:${p=>p.theme.mobileBreakpoint}px){ flex-direction:row; }
`;

const ArticleContentContainer = styled.div`
  width:100%; height:fit-content; display:flex; flex-direction:row;
  .date_desktop{ font-size:80%; padding:0; border-radius:0; background:transparent;
    color:${p=>getContrast(p.theme.colors.darkest, p.theme.colors.brand)>10?p.theme.colors.darkest:p.theme.colors.lightest};
    font-family:${p=>p.theme.headingFontFamily}; }
  .date_mobile{ display:none; }
  @media (max-width:${p=>p.theme.mobileBreakpoint}px){
    display:flex; flex-direction:column;
    .date_desktop{ display:none; }
    .date_mobile{ display:block; text-align:right; font-size:80%; background:transparent; margin:0; }
  }
`;

const ArticleImg = styled(Img)``;

const ArticleTitle = styled.h1`
  @media (max-width:${p=>p.theme.mobileBreakpoint}px){ margin-bottom:0; }
`;

const ArticleDate = styled.span`
  padding:6px; border-radius:10px; background:${p=>p.theme.colors.brand};
  color:${p=>getContrast(p.theme.colors.darkest, p.theme.colors.brand)>10?p.theme.colors.darkest:p.theme.colors.lightest};
  font-family:${p=>p.theme.headingFontFamily};
  @media (max-width:${p=>p.theme.mobileBreakpoint}px){ background:transparent; color:inherit; }
`;

const ArticleContent = styled.div`
  > p:first-child::first-letter{
    color:${p=>p.theme.colors.brand}; padding:0; margin:-4px 6px;
    font-family:${p=>p.theme.dropCapsFontFamily}; font-size:4rem; float:left; line-height:1;
  }
  height:fit-content; width:fit-content; flex:3; padding:0 20px 40px 30px;
  p{ padding-right:0; }
  @media (max-width:${p=>p.theme.mobileBreakpoint}px){ padding:0; p{ padding-right:0; } }
  > a { text-decoration:underline; }
  blockquote:before { color:${p=>p.theme.colors.brand}; }
`;

const ArticleMetadata = styled.div`
  flex:1; max-width:15em; margin-top:6px;
  @media (max-width:${p=>p.theme.mobileBreakpoint}px){ display:none; }
`;

const PageWrapper = styled.div` margin-bottom:40px; `;

/* ---------------- MDX shortcodes ---------------- */
const shortcodes = {
  Link,
  CallToAction,
  HeroBlock,
  Button,
  LatestPosts,
  Cards,
  ListOfEmployees,
  Grid,
  ListOfLeasingPackages,
  NewsletterForm,
  SupportPricingCalculator,
  DisplayVariable,
  h1, h2, h3, h4, h5, h6,
  YoutubeWrapper,
  LeasingCalculator,
};

/* ---------------- page component ---------------- */
const EntryTemplate = ({ data, pageContext, children }) => {
  const mdx = data.mdx;

  return (
    <Layout
      collection={mdx.fields.collection}
      slug={mdx.fields.slug}
      breadcrumb={mdx.frontmatter.breadcrumb || null}
    >
      <GlobalStyle />
      <Seo
        lang="fi"
        description={mdx.frontmatter.head ? mdx.frontmatter.head.description : null}
        title={mdx.frontmatter.head ? mdx.frontmatter.head.title : null}
        image={
          mdx.frontmatter.thumbnail
            ? mdx.frontmatter.thumbnail.childImageSharp?.fixed?.src
            : null
        }
        keywords={mdx.frontmatter.head?.keywords || null}
      />

      {mdx.fields.collection === "posts" && (
        <ArticleContainer>
          <ArticleContentContainer>
            <ArticleMetadata>
              <p className="date_desktop">
                <ArticleDate>{mdx.frontmatter.date}</ArticleDate>
              </p>
              <TableOfContents headings={mdx.tableOfContents} />
            </ArticleMetadata>
            <ArticleContent>
              <ArticleTitle>{mdx.frontmatter.head?.title || mdx.frontmatter.title}</ArticleTitle>
              <p className="date_mobile">
                <ArticleDate>{mdx.frontmatter.date}</ArticleDate>
              </p>

              <MDXProvider components={shortcodes}>{children}</MDXProvider>
            </ArticleContent>
          </ArticleContentContainer>
        </ArticleContainer>
      )}

      {mdx.fields.collection === "pages" && (
        <PageWrapper>
          <MDXProvider components={shortcodes}>{children}</MDXProvider>
        </PageWrapper>
      )}

      {pageContext.contactForm && (
        <ContactForm
          title={pageContext.contactForm.title}
          contactName={pageContext.contactForm.contactPerson?.name}
          contactTitle={pageContext.contactForm.contactPerson?.title}
          contactEmail={pageContext.contactForm.contactPerson?.email}
          contactPhone={pageContext.contactForm.contactPerson?.phone}
          contactImage={pageContext.contactForm.contactPerson?.imageUrl || null}
        />
      )}
    </Layout>
  );
};

export default EntryTemplate;

/* ---------------- page query ---------------- */
export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      fields { slug collection }
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        title
        head { title description keywords }
        breadcrumb { label path }
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 900) { ...GatsbyImageSharpFluid }
            fixed(width: 600, height: 600) { src }
          }
        }
      }
      
      tableOfContents
    }
  }
`;
