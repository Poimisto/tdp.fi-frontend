import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link, StaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";

const PostTitle = styled.h3`
  margin: 0 0 5px 0;
  font-size: 1rem;
  line-height: 160%;
`;

const config = require("./../../content/settings.json");

const PostLink = ({ post }) => {
  const img = post.frontmatter?.thumbnail
    ? getImage(post.frontmatter.thumbnail)
    : null;
  const title =
    post.frontmatter?.head?.title || post.frontmatter?.title || "Untitled";

  return (
    <Link to={post.fields.slug} style={{ textDecoration: "none" }}>
      <Card>
        <CardActionArea>
          {img && (
            <GatsbyImage
              image={img}
              alt={title}
              style={{ height: 170 }}
              imgStyle={{ objectFit: "cover" }}
            />
          )}
          <CardContent>
            <PostTitle>{title}</PostTitle>
            {post.excerpt}
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default function PostList(props) {
  const maxNumberOfPosts = props.maxNumberOfPosts || 4;

  return (
    <StaticQuery
      query={graphql`
        query PostQuery {
          allMdx(
            limit: 100
            sort: { frontmatter: { date: DESC } }
            filter: { fields: { collection: { eq: "posts" } } }
          ) {
            edges {
              node {
                id
                excerpt(pruneLength: 140)
                frontmatter {
                  date(formatString: "MMMM DD, YYYY")
                  path
                  head {
                    title
                    description
                  }
                  # NOTE: Requires createSchemaCustomization with
                  # thumbnail: File @fileByRelativePath
                  thumbnail {
                    childImageSharp {
                      gatsbyImageData(
                        width: 640
                        height: 170
                        placeholder: BLURRED
                      )
                    }
                  }
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        let count = 0;
        const Posts = data.allMdx.edges
          .filter(() => {
            count += 1;
            return count <= maxNumberOfPosts;
          })
          .map(({ node }) => (
            <Grid item xs={12} sm={6} key={node.id}>
              <PostLink post={node} />
            </Grid>
          ));

        return (
          <div style={{ margin: "40px 0 20px 0" }}>
            <h2>
              {props.title} &darr;
            </h2>
            <Grid container spacing={4}>
              {Posts}
            </Grid>
            {data.allMdx.edges.length > maxNumberOfPosts && (
              <div style={{ marginTop: "10px" }}>
                <Link to={config.blogpage}>&raquo; Katso kaikki</Link>
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
