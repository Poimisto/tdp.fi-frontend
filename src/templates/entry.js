import React from "react"
import { graphql } from 'gatsby'
import Layout from './layout'
import {MDXProvider} from '@mdx-js/react'
import {MDXRenderer} from 'gatsby-plugin-mdx';
import CallToAction from './../components/CallToAction'
import Link from '../components/Link'
import Seo from '../components/Seo'
import HeroBlock from '../components/HeroBlock'
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Img from 'gatsby-image';
import styled from 'styled-components';
import LatestPosts from './../components/LatestPosts'
import { getContrast } from 'polished'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    text-decoration:none;
    font-family: ${props => props.theme.bodyFontFamily};
    line-height:180%;
    font-size:16px;
  }
  body {
    overflow-x:hidden;
    padding:0;
    margin:0;
  }
  a {
    text-decaration:none;
    text-transform:uppercase;
    color:red;
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
`;

const ArticleImg = styled(Img)`
  margin: -60px 0px;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    margin: -40px -40px;
  }
`;
const ArticleTitle = styled.h1`

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
  padding:0px 0px 0px 120px;
  p {
    padding-right:0px;
  }
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    padding:0px 0px;  p {
      padding-right:0px;
    }
  }
  a {
    text-decoration:underline;
  }
  blockquote:before {
    color:${props => props.theme.colors.brand};
  }
`;
const ArticleMetadata = styled.div`
  float:left;
  margin-top:6px;

  .date {
    background:red;
    padding:6px;
    border-radius:10px;
    background: ${props => props.theme.colors.brand};
    color:${props => getContrast(props.theme.colors.darkest, props.theme.colors.brand) > 10 ? props.theme.colors.darkest : props.theme.colors.lightest };
    font-family:${props => props.theme.headingFontFamily};
  }
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {    
    display:none;
  }

`;


const shortcodes = { Link, CallToAction, HeroBlock, Grid, Hidden, LatestPosts }


const EntryTemplate = ({data}) => {
  return (
    <Layout collection={data.mdx.fields.collection} slug={data.mdx.fields.slug}>
      <GlobalStyle/>
      <Seo 
        lang="fi" 
        description={data.mdx.frontmatter.metaDescription} 
        title={data.mdx.frontmatter.title}
        image={data.mdx.frontmatter.thumbnail ? data.mdx.frontmatter.thumbnail.childImageSharp.fixed.src : null}
      />
      {data.mdx.fields.collection === 'posts' && (
        <div>
          <ArticleTitle>{data.mdx.frontmatter.title}</ArticleTitle>
          {!!data.mdx.frontmatter.thumbnail && (
            <HeroBlock bgColor="brand">
              <ArticleImg
                fluid={data.mdx.frontmatter.thumbnail.childImageSharp.fluid}
                alt={data.mdx.frontmatter.title + "- Featured Shot"}
              />   
              </HeroBlock>
          )}
          <ArticleMetadata>
            <p>
              <span className="date">{data.mdx.frontmatter.date}</span>
            </p>
          </ArticleMetadata>          
          <ArticleContent>
            <MDXProvider components={shortcodes}>
              <MDXRenderer>
                {data.mdx.body}
              </MDXRenderer>
            </MDXProvider>
          </ArticleContent>
        </div>
      )}
      {data.mdx.fields.collection === 'pages' && (
        <MDXProvider components={shortcodes}>
          <MDXRenderer>
            {data.mdx.body}
          </MDXRenderer>
        </MDXProvider>
      )}
      {data.mdx.fields.collection === 'people' && (
        <MDXProvider components={shortcodes}>
          <MDXRenderer>
            {data.mdx.body}
          </MDXRenderer>
        </MDXProvider>
      )}
    </Layout>
  )
}

export default EntryTemplate

export const pageQuery = graphql`
  query($path: String!) {
    mdx(fields: { slug: { eq: $path } }) {
      fields {
        collection
        slug
      }
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        title
        metaDescription
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
    }
  }
`
