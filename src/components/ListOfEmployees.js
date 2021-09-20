import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import styled from 'styled-components'

const PeopleGrid = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    grid-template-columns: 1fr 1fr;
  }
  margin: 30px 0;
`;
const Employee = styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;

  img {
    border-radius:50%;
  }
  .name {
    font-weight:bold;
  }
`;

export default () => {
  const data = useStaticQuery(graphql`
    query peopleQuery {
      allPeopleJson(filter: {isEmployee: { eq: true }}) {
        edges {
          node {
            title
            name
            phone
            isEmployee
            image {
              childImageSharp {
                fixed(width: 175, height:175) {
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
    <PeopleGrid>
      {data.allPeopleJson.edges.map( (node) => {
        return (
          <Employee>
            <Img className="img" fixed={node.node.image.childImageSharp.fixed} />

            <span className="name">{node.node.name}</span>
          </Employee>
        )
      })}
    </PeopleGrid>
  )
}