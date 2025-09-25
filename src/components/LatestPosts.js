import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Link, StaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";

const THUMB_HEIGHT = 170;

const PostTitle = styled.h3`
  margin: 0 0 5px 0;
  font-size: 1rem;
  line-height: 160%;
`;

const ThumbImg = styled.img`
  display: block;
  width: 100%;
  height: ${THUMB_HEIGHT}px;
  object-fit: cover;
  /* Match card’s rounded top corners visually */
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Wrapper = styled.div`
  margin: 40px 0 20px 0;
`;

const config = require("./../../content/settings.json");

const PostLink = ({ post }) => {
  const fm = post.frontmatter || {};
  const title = fm?.head?.title || fm?.title || "Untitled";

  // Three-level fallback: gatsbyImageData -> publicURL -> raw string
  const fileNode = fm.thumbnail || null;
  const gatsbyImg = fileNode?.childImageSharp
    ? getImage(fileNode.childImageSharp)
    : null;
  const publicURL = fileNode?.publicURL || null;
  const raw = typeof fileNode === "string" ? fileNode : null;

  return (
    <Link to={post.fields.slug} style={{ textDecoration: "none" }}>
      <Card elevation={1}>
        <CardActionArea>
          {gatsbyImg ? (
            <GatsbyImage
              image={gatsbyImg}
              alt={title}
              style={{ height: THUMB_HEIGHT }}
              imgStyle={{ objectFit: "cover" }}
            />
          ) : publicURL ? (
            <ThumbImg src={publicURL} alt={title} />
          ) : raw ? (
            <ThumbImg src={raw} alt={title} />
          ) : null}

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
                  title
                  head {
                    title
                    description
                  }
                  # We support both optimized and raw/public URL
                  thumbnail {
                    publicURL
                    childImageSharp {
                      gatsbyImageData(
                        width: 640
                        height: 170
                        placeholder: BLURRED
                        transformOptions: { fit: COVER }
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
            <Grid
              item
              xs={12}
              sm={6}
              key={node.id}
              sx={theme => ({
                minWidth: 0,
                maxWidth: {
                  xs: 1,
                  sm: `calc((100% - ${theme.spacing(4)}) / 2)`,
                },
              })}
            >
              <PostLink post={node} />
            </Grid>
          ));

        return (
          <Wrapper>
            <h2>{props.title} &darr;</h2>
            <Grid container spacing={4}>
              {Posts}
            </Grid>
            {data.allMdx.edges.length > maxNumberOfPosts && (
              <div style={{ marginTop: 10 }}>
                <Link to={config.blogpage}>&raquo; Katso kaikki</Link>
              </div>
            )}
          </Wrapper>
        );
      }}
    />
  );
}
