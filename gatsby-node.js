/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const config = require('./content/settings.json');
const crypto = require('crypto')

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type Mdx implements Node {
      frontmatter: Frontmatter
    }
    
    type Frontmatter @infer {
      thumbnail: File @fileByRelativePath,
    }
    type PeopleJson implements Node {
      image: File @fileByRelativePath
    }
  `;
  createTypes(typeDefs);
  createTypes(typeDefs)
}

exports.onCreateNode = async ({ node, getNode, actions }) => {
 
  const { createNodeField, createNode, digest } = actions;
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

  if (node.internal.type === 'LeasingPackagesJson') {
    let slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: '/leasing-paketit' + slug,
    })
    // Add text/markdown node children to Release node
    const textNode = {
      id: `${node.id}-MarkdownBody`,
      parent: node.id,
      dir: path.resolve("./"),
      internal: {
        type: `${node.internal.type}MarkdownBody`,
        mediaType: "text/markdown",
        content: node.body,
        contentDigest: crypto
        .createHash(`md5`)
        .update(node.body)
        .digest(`hex`),
      },
    }
    createNode(textNode)

    // Create markdownBody___NODE field
    createNodeField({
      node,
      name: "markdownBody___NODE",
      value: textNode.id,
    })
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {

  const { createPage } = actions

  const template = path.resolve(`src/templates/entry.js`)
  const query = await graphql(`
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
            frontmatter {
              contactForm
              author
            }
          }
        }
      }
      allLeasingPackagesJson {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      allFormsJson {
        edges {
          node {
            title
            contactPerson
          }
        }
      }
      allPeopleJson {
        edges {
          node {
            title
            name
            email
            phone
            image {
              childImageSharp {
                fixed(width: 200, height:200) {
                  src
                }
              }
            }
          }
        }
      }
    }
  `)


  // Handle errors
  if (query.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  query.data.allMdx.edges.forEach(({ node }) => {

    let contactForm = (node.frontmatter.contactForm) ? query.data.allFormsJson.edges.find( form => form.node.title === node.frontmatter.contactForm) : null;
    if (contactForm) contactForm = contactForm.node;

    if (contactForm && contactForm.contactPerson) {
      let person = query.data.allPeopleJson.edges.find( person => person.node.name === contactForm.contactPerson);
      if (person) contactForm.contactPerson = person.node;
    }

    let author = (node.frontmatter.author) ? query.data.allPeopleJson.edges.find( person => person.node.name === node.frontmatter.author) : null;
    if (author) author = author.node;
  
    createPage({
      path: node.fields.slug,
      component: template,
      context: {
        contactForm : contactForm,
        author: author,
      }, // additional data can be passed via context
    })
  })
  query.data.allLeasingPackagesJson.edges.forEach(({ node }) => { 

    createPage({
      path: node.fields.slug,
      component: template,
      context: {
        contactForm: query.data.allFormsJson.edges.find( form => form.node.title === "Ota yhteyttä")
      }
    })


  });
  

  
}

