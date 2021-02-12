import React from "react"
import Card from '@material-ui/core/Card'


import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

import Grid from '@material-ui/core/Grid';

import { StaticQuery, graphql, Link } from "gatsby"

import Img from "gatsby-image"
import styled from 'styled-components'
const PostTitle = styled.h3`
  margin: 0px 0px 5px 0px;
  font-size:1rem;
  line-height:160%;
`;

const PostLink = ({ post }) => (
  <Link to={post.fields.slug}>
    <Card>
    <CardActionArea>
        {post.frontmatter.thumbnail && (
          <CardMedia
          component="img"
          alt={post.frontmatter.title}
          height="240"
          image={post.frontmatter.thumbnail.childImageSharp.fluid.src}
          title={post.frontmatter.title}
          style={{textDecoration:"none"}}
          />
        )}
        <CardContent>
          <PostTitle>{post.frontmatter.title}</PostTitle>
          {post.excerpt}
        </CardContent>    
    </CardActionArea>
  </Card>
  </Link>
  )

export default function PostList(props) {
  const maxNumberOfPosts = props.maxNumberOfPosts || 4;
  return (
    <StaticQuery
      query={graphql`
        query PostQuery {
          allMdx(
            limit: 100
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { fields: { collection: { eq: "posts" } } }
            ) {
            edges {
              node {
                id
                excerpt(pruneLength: 140)
                frontmatter {
                  date(formatString: "MMMM DD, YYYY")
                  path
                  title
                  thumbnail {
                    childImageSharp {
                      fluid {
                          ...GatsbyImageSharpFluid
                      }
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
      render={ (data) => {
        let counter = 0;
        const Posts = data.allMdx.edges
        .filter(edge => {
          // You can filter your posts based on some criteria
          counter++;
          if ( counter > maxNumberOfPosts) return false;
          else return true;
        }) 
        .map(edge => <Grid item xs={12} sm={6} key={edge.node.id}><PostLink post={edge.node} /></Grid>)
        return (
          <div>
            <h2>{props.title} &darr;</h2>
            <Grid container spacing={2}>
              {Posts}
            </Grid>

          </div>

        )
       
        
      }}
    />
  )
}