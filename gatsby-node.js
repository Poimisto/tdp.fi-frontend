/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const config = require('./content/settings.json');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type Mdx implements Node {
      frontmatter: Frontmatter
    }
    
    type Frontmatter @infer {
      thumbnail: File @fileByRelativePath,
    }
  `;
  createTypes(typeDefs);
  createTypes(typeDefs)
}

exports.onCreateNode = async ({ node, getNode, actions }) => {
 
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {

    let slug = createFilePath({ node, getNode })
    if (node.frontmatter.path) slug = node.frontmatter.path
    if (slug.replace(/^\//, '') === config.homepage) slug = '/'


    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    const parent = getNode(node.parent);
    let collection = parent.sourceInstanceName;

    createNodeField({
      node,
      name: 'collection',
      value: collection,
    });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {

  const { createPage } = actions

  const personPageTemplate = path.resolve(`src/templates/entry.js`)
  const people = await graphql(`
    {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (people.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  people.data.allMdx.edges.forEach(({ node }) => {

    createPage({
      path: node.fields.slug,
      component: personPageTemplate,
      context: {}, // additional data can be passed via context
    })
  })

  

  
}

