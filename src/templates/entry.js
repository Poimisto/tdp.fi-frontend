import React from "react"
import { graphql } from 'gatsby'
import Layout from './layout'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import CallToAction from './../components/CallToAction'
import Link from '../components/Link'
import Seo from '../components/Seo'
import HeroBlock from '../components/HeroBlock'
import Cards from '../components/Cards'
import Img from 'gatsby-image';
import styled from 'styled-components';
import LatestPosts from './../components/LatestPosts'
import ListOfEmployees from '../components/ListOfEmployees'
import ListOfLeasingPackages from '../components/ListOfLeasingPackages'

import { getContrast } from 'polished'
import { createGlobalStyle } from 'styled-components'
import Grid from '@material-ui/core/Grid'


import ContactForm from './../components/ContactForm'
import NewsletterForm from "../components/NewsletterForm"
import SupportPricingCalculator from "../components/SupportPricingCalculator"
import DisplayVariable from '../components/DisplayVariable'
import TableOfContents from '../components/TableOfContents'
import YoutubeWrapper from '../components/YoutubeWrapper'
import { H1 as h1, H2 as h2, H3 as h3, H4 as h4, H5 as h5, H6 as h6 } from '../components/Headings'

const GlobalStyle = createGlobalStyle`
  * {
    text-decoration:none;
    font-family: ${props => props.theme.bodyFontFamily};
    line-height:180%;
    font-size:16px;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    overflow-x:hidden;
    padding:0;
    margin:0;
  }
  a {
    text-decaration:none;
    color: ${props => props.theme.colors.link};
  }
  button {
    text-decoration:none;
  }
  blockquote {
    font-style:italic;
  }
  blockquote:before {
    content:"”";
    float:left;
    display:Block;
    font-size:92px;
    margin:30px 0px 0px -50px;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family ${props => props.theme.headingFontFamily};
    line-height:160%;
  }
  h1 {
    font-size:2.5em;
  }
  h2 {
    font-size:1.4em;
  }
  h3 {
    font-size: 1.3em;
  }
  h4, h5, h6 {
    font-size: 1.1em;
  }
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    h1 {
      font-size:1.6em;
    }
  }
  font-size: ${props => props.theme.fontSize};
  line-height: ${props => props.theme.bodyLineHeight};
  table {
    width : 100%;
    margin-bottom:40px;
  }
   table td {
    padding:8px;
  }
  table :nth-child(odd) td {
    background:#f3f3f3;
  }
`;

const ArticleContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    flex-direction: row;
  }
`;

const ArticleContentContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  .date_desktop {
    font-size:80%;
    padding:0px;
    border-radius:0px;
    background: transparent;
    color:${props => getContrast(props.theme.colors.darkest, props.theme.colors.brand) > 10 ? props.theme.colors.darkest : props.theme.colors.lightest};
    font-family:${props => props.theme.headingFontFamily};
  }
  .date_mobile {
    display: none;
  }
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    display: flex;
    flex-direction: column;
    .date_desktop {
      display: none;
    }
    .date_mobile {
      display: block;
      text-align: right;
      font-size: 80%;
      background: transparent;
      margin: 0;
    }
  }
`;

const ArticleImg = styled(Img)``;

const ArticleTitle = styled.h1`
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    margin-bottom: 0;
  }
`;

const ArticleDate = styled.span`
  padding: 6px;
  border-radius: 10px;
  background: ${props => props.theme.colors.brand};
  color: ${props => getContrast(props.theme.colors.darkest, props.theme.colors.brand) > 10 ? props.theme.colors.darkest : props.theme.colors.lightest};
  font-family: ${props => props.theme.headingFontFamily};
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    background: transparent;
    color: none;
  }
`;

const ArticleContent = styled.div`
  /* Style that first letter! */
  > p:first-child::first-letter {
    color: ${props => props.theme.colors.brand};;
    padding:0;
    margin:-4px 6px;
    font-family: ${props => props.theme.dropCapsFontFamily};
    font-size: 4rem;
    float: left;
    line-height: 1;
  }
  height: fit-content;
  width: fit-content;
  flex: 3;
  padding:0px 20px 40px 30px;
  p {
    padding-right:0px;
  }
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    padding:0px 0px;
    p {
      padding-right:0px;
    }
  }
  > a {
    text-decoration:underline;
  }
  blockquote:before {
    color:${props => props.theme.colors.brand};
  }
`;

const ArticleMetadata = styled.div`
  flex: 1;
  max-width: 15em;
  margin-top:6px;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {    
    display: none;
  }
`;

const PageWrapper = styled.div`
  margin-bottom:40px;
`;


const shortcodes = { Link, CallToAction, HeroBlock, LatestPosts, Cards, ListOfEmployees, Grid, ListOfLeasingPackages, NewsletterForm, SupportPricingCalculator, DisplayVariable, h1, h2, h3, h4, h5, h6, YoutubeWrapper }


const EntryTemplate = ({ data, pageContext }) => {
  return (
    <Layout collection={data.mdx.fields.collection} slug={data.mdx.fields.slug} breadcrumb={data.mdx.frontmatter.breadcrumb || null}>
      <GlobalStyle />
      <Seo
        lang="fi"
        description={data.mdx.frontmatter.head ? data.mdx.frontmatter.head.description : null}
        title={data.mdx.frontmatter.head ? data.mdx.frontmatter.head.title : null}
        image={data.mdx.frontmatter.thumbnail ? data.mdx.frontmatter.thumbnail.childImageSharp.fixed.src : null}
      />

      {data.mdx.fields.collection === 'posts' && (
        <ArticleContainer>
          <ArticleContentContainer>
            <ArticleMetadata>
              <p className="date_desktop">
                <ArticleDate>{data.mdx.frontmatter.date}</ArticleDate>
              </p>
              <TableOfContents headings={data.mdx.tableOfContents} />
            </ArticleMetadata>
            <ArticleContent>
              <ArticleTitle>{data.mdx.frontmatter.head.title}</ArticleTitle>
              <p className="date_mobile">
                <ArticleDate>{data.mdx.frontmatter.date}</ArticleDate>
              </p>
              <MDXProvider components={shortcodes}>
                <MDXRenderer>
                  {data.mdx.body}
                </MDXRenderer>
              </MDXProvider>
            </ArticleContent>
          </ArticleContentContainer>
        </ArticleContainer>
      )}
      {data.mdx.fields.collection === 'pages' && (
        <PageWrapper>


          <MDXProvider components={shortcodes}>
            <MDXRenderer>
              {data.mdx.body}
            </MDXRenderer>
          </MDXProvider>
        </PageWrapper>
      )}


      {pageContext.contactForm && (

        <ContactForm
          title={pageContext.contactForm.title}
          contactName={pageContext.contactForm.contactPerson.name}
          contactTitle={pageContext.contactForm.contactPerson.title}
          contactEmail={pageContext.contactForm.contactPerson.email}
          contactPhone={pageContext.contactForm.contactPerson.phone}
          contactImage={pageContext.contactForm.contactPerson.image.childImageSharp.fixed.src}

        />
      )}
    </Layout>
  )
}

export default EntryTemplate

export const pageQuery = graphql`
  query($path: String!) {
    mdx(fields: { slug: { eq: $path } }) {
      fields {
        slug
        collection
      }
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        title
        head {
          title
          description
        }
        breadcrumb {
          label
          path
        }
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 900) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 600, height: 600) {
              src
            }
          }
        }
      }
      body
      tableOfContents
    }
  }
`
