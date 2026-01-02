/**
 * Implement Gatsby's Node APIs in this file.
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
import path from "node:path";
import { createFilePath } from "gatsby-source-filesystem";
import config from "./content/settings.json" with { type: "json"};

/**
 * Strongly type MDX/Markdown frontmatter so image-like fields are File nodes,
 * which fixes "String has no subfields" GraphQL errors.
 */
export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    # ===== MDX =====
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
      fields: MdxFields
    }

    type MdxFields {
      slug: String
      collection: String
    }

    type MdxFrontmatter {
      title: String
      description: String
      path: String
      personName: String
      contactFormPerson: String
      contactForm: String
      author: String
      tags: [String]
      date: Date @dateformat

      # local file fields (strings saved by Decap under /assets)
      image: File @fileByRelativePath
      thumbnail: File @fileByRelativePath
      avatar: File @fileByRelativePath
      photo: File @fileByRelativePath
      hero: File @fileByRelativePath
      logo: File @fileByRelativePath

      head: MdxFrontmatterHead
      breadcrumb: [BreadcrumbItem]
    }

    type BreadcrumbItem {
      label: String
      path: String
    }

    type MdxFrontmatterHead {
      title: String
      description: String
      image: File @fileByRelativePath
      thumbnail: File @fileByRelativePath
    }

    # ===== MarkdownRemark (if any .md files remain) =====
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
      fields: MarkdownRemarkFields
    }

    type MarkdownRemarkFields {
      slug: String
      collection: String
    }

    type MarkdownRemarkFrontmatter {
      title: String
      description: String
      path: String
      tags: [String]
      date: Date @dateformat
      image: File @fileByRelativePath
      thumbnail: File @fileByRelativePath
      head: MarkdownRemarkFrontmatterHead
    }

    type MarkdownRemarkFrontmatterHead {
      title: String
      description: String
      image: File @fileByRelativePath
      thumbnail: File @fileByRelativePath
    }

    # ===== JSON content =====
    type PeopleJson implements Node {
      title: String
      name: String
      email: String
      phone: String
      isEmployee: Boolean
      image: File @fileByRelativePath
      linkedin: String
    }

    type FormsJson implements Node {
      title: String
      contactPerson: String
    }
  `);
};

/**
 * Map string paths like "/assets/foo.jpg" to real File nodes without using
 * gatsby-plugin-netlify-cms-paths. Uses nodeModel.findOne (supported in Gatsby).
 */
export const createResolvers = ({ createResolvers }) => {
  const escapeRegExp = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const fileLookup = fieldName => ({
    type: "File",
    async resolve(source, args, context) {
      const val = source[fieldName];
      if (!val) return null;

      // Already a File? (when @fileByRelativePath matched)
      if (val && val.internal && val.internal.type === "File") return val;

      // Accept "/assets/foo.jpg" or "assets/foo.jpg"
      const raw = String(val);
      const rel = raw.replace(/^\/+/, "").replace(/^assets\/?/, ""); // drop leading slash(es) and "assets/"

      // Look up by suffix to be tolerant of subfolders under static/assets
      return context.nodeModel.findOne({
        type: "File",
        query: {
          filter: {
            relativePath: { regex: `/${escapeRegExp(rel)}$/` },
          },
        },
      });
    },
  });

  createResolvers({
    // JSON people (your ListOfEmployees query depends on this)
    PeopleJson: {
      image: fileLookup("image"),
    },

    // Make MDX frontmatter image-like fields robust even if Decap saved absolute paths
    MdxFrontmatter: {
      image: fileLookup("image"),
      thumbnail: fileLookup("thumbnail"),
      avatar: fileLookup("avatar"),
      photo: fileLookup("photo"),
      hero: fileLookup("hero"),
      logo: fileLookup("logo"),
    },
    MdxFrontmatterHead: {
      image: fileLookup("image"),
      thumbnail: fileLookup("thumbnail"),
    },

    // If you still have any MarkdownRemark content:
    MarkdownRemarkFrontmatter: {
      image: fileLookup("image"),
      thumbnail: fileLookup("thumbnail"),
    },
    MarkdownRemarkFrontmatterHead: {
      image: fileLookup("image"),
      thumbnail: fileLookup("thumbnail"),
    },
  });
};

/**
 * Create slug and collection for MDX nodes.
 */
export const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    let slug = createFilePath({ node, getNode });
    if (node.frontmatter && node.frontmatter.path) slug = node.frontmatter.path;
    if (slug === config.homepage) slug = `/`;

    createNodeField({ node, name: `slug`, value: slug });

    const parent = getNode(node.parent);
    const collection =
      parent && parent.sourceInstanceName ? parent.sourceInstanceName : null;
    createNodeField({ node, name: `collection`, value: collection });
  }
};

/**
 * Create pages from MDX using the NEW MDX runtime.
 * Pass __contentFilePath so the compiled MDX is injected as `children`
 * into the page template.
 * Also pass a flattened contactForm and author object in page context.
 */
export const createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const template = path.resolve(`src/templates/entry.js`);
  const result = await graphql(`
    {
      allMdx(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        edges {
          node {
            id
            fields { slug collection }
            internal { contentFilePath }
            frontmatter {
              contactForm
              author
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
                gatsbyImageData(width: 200, height: 200, placeholder: BLURRED)
              }
              publicURL
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`, result.errors);
    return;
  }

  const forms = result.data.allFormsJson.edges.map(e => e.node);
  const people = result.data.allPeopleJson.edges.map(e => e.node);

  result.data.allMdx.edges.forEach(({ node }) => {
    // resolve contact form + person
    let contactForm = null;
    if (node.frontmatter?.contactForm) {
      contactForm =
        forms.find(f => f.title === node.frontmatter.contactForm) || null;
      if (contactForm?.contactPerson) {
        const person =
          people.find(p => p.name === contactForm.contactPerson) || null;
        if (person) {
          const imgData = person.image?.childImageSharp?.gatsbyImageData;
          const imageUrl =
            (imgData &&
              imgData.images &&
              imgData.images.fallback &&
              imgData.images.fallback.src) ||
            person.image?.publicURL ||
            null;

          contactForm = {
            ...contactForm,
            contactPerson: {
              title: person.title || null,
              name: person.name || null,
              email: person.email || null,
              phone: person.phone || null,
              imageUrl, // <— pass a plain URL for runtime
            },
          };
        }
      }
    }

    // resolve author (optional)
    let author = null;
    if (node.frontmatter?.author) {
      const person = people.find(p => p.name === node.frontmatter.author) || null;
      if (person) {
        const imgData = person.image?.childImageSharp?.gatsbyImageData;
        const imageUrl =
          (imgData &&
            imgData.images &&
            imgData.images.fallback &&
            imgData.images.fallback.src) ||
          person.image?.publicURL ||
          null;
        author = {
          title: person.title || null,
          name: person.name || null,
          email: person.email || null,
          phone: person.phone || null,
          imageUrl,
        };
      }
    }

    createPage({
      path: node.fields.slug,
      component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
        slug: node.fields.slug,
        collection: node.fields.collection,
        contactForm,
        author,
      },
    });
  });
};

export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@mui/styled-engine": "@mui/styled-engine-sc"
      }
    }
  })
}