import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";

const PeopleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: ${(props) => props.theme.mobileBreakpoint}px) {
    grid-template-columns: 1fr 1fr;
  }
  margin: 30px 0;
`;

const Employee = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .name {
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
  }
`;

const ListOfEmployees = () => {
  const data = useStaticQuery(graphql`
    query peopleQuery {
      allPeopleJson(filter: { isEmployee: { eq: true } }) {
        edges {
          node {
            name
            isEmployee
            image {
              childImageSharp {
                gatsbyImageData(
                  width: 175
                  height: 175
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    }
  `);

  return (
    <PeopleGrid>
      {data.allPeopleJson.edges.map(({ node }) => {
        const img = getImage(node.image);
        return (
          <Employee key={node.name}>
            {img && (
              <GatsbyImage
                className="img"
                image={img}
                alt={node.name || "Employee photo"}
                imgStyle={{ borderRadius: "50%" }}
              />
            )}
            <span className="name">{node.name}</span>
          </Employee>
        );
      })}
    </PeopleGrid>
  );
};

export default ListOfEmployees;
