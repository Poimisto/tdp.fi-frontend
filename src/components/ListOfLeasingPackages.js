import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import styled from 'styled-components'

const PackageGrid = styled.div`

`;
const Package = styled.div`
  display:grid;
  grid-template-columns: 0.2fr 1fr;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default () => {
  const data = useStaticQuery(graphql`
    query leasingPackageQuery {
      allLeasingPackagesJson {
        edges {
          node {
            fields {
              slug
            }
            pricedItems {
              price {
                price
                price24months
                price36months
              }
              title
            }
            name
            title
            description
            image {
              childImageSharp {
                fixed(width: 200) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  
  `)
  return (
    <PackageGrid>
      {data.allLeasingPackagesJson.edges.map( (node) => {
        return (
          <Package>

              <Img className="img" fixed={node.node.image.childImageSharp.fixed} />
         
            <div className="content">
              <a href={node.node.fields.slug}><h2 className="title">{node.node.title}</h2></a>
              <p>{node.node.description}</p>

            </div>


          </Package>
        )
      })}
    </PackageGrid>
  )
}