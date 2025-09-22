import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

const PackageGrid = styled.div`

`;
const Package = styled.div`
  display:grid;
  grid-template-columns: 0.2fr 1fr;
  grid-gap: 16px;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    grid-template-columns: 0.2fr 1fr;
  }
`;

export default () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allMdx(
        filter: {
          fields: {
            slug: {
              regex: "/^\/leasing-paketit.*/"
            }
          }
        }
      ) {
        edges {
          node {
            fields {slug}
            frontmatter {
              thumbnail {
                childImageSharp {
                  gatsbyImageData(
                    width: 175,
                    height: 240,
                    layout: FIXED,
                    placeholder: BLURRED
                  )
                }
              }
              head {
                description
                title
              }

            }
          }
        }
      }
    }  
  `)
  return (
    <PackageGrid>
      {data.allMdx.edges.map((node) => {
        return (
          <Package>
            <GatsbyImage className="img" image={node.node.frontmatter.thumbnail.childImageSharp.gatsbyImageData} />
            <div className="content">
              <a href={node.node.fields.slug}><h2 className="title">{node.node.frontmatter.head.title}</h2></a>
              <p>{node.node.frontmatter.head.description}</p>
              <a href={node.node.fields.slug}>Tutustu tarkemmin</a>
            </div>
          </Package>
        )
      })}
    </PackageGrid>
  )
}