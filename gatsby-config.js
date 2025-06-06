require("dotenv").config();

module.exports = {
  siteMetadata: require('./content/settings.json'),
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-remark-images`,
      options: {
        maxWidth: 1200,
        backgroundColor: 'transparent', // required to display blurred image first
        linkImagesToOriginal: false,
        disableBgImageOnAlpha: true,
      },
    },
    // required here so frontmatter stuff works
    {
      resolve: `gatsby-plugin-netlify-cms-paths`,
      options: {
        cmsConfig: `/static/admin/config.yml`,
      }
    }, 
    'gatsby-transformer-json',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [ 
          // required here so body stuff works
          {
            resolve: `gatsby-plugin-netlify-cms-paths`,
            options: {
              cmsConfig: `/static/admin/config.yml`,
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              backgroundColor: 'transparent', // required to display blurred image first
              linkImagesToOriginal: false,
              disableBgImageOnAlpha: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `uploads`,
        path: `${__dirname}/static/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `people`,
        path: `${__dirname}/content/people`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `forms`,
        path: `${__dirname}/content/forms`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `variables`,
        path: `${__dirname}/content/variables`
      }
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`, // for custom preview in the Netlify CMS,
        customizeWebpackConfig: (config, { plugins }) => {
          config.node = {
            ...config.node,
            fs: "empty",
            child_process: "empty",
            module: "empty",
          };
          config.plugins.push(
            plugins.define({
              __MANIFEST_PLUGIN_HAS_LOCALISATION__: JSON.stringify('false'),
            }),
          );
        },
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `TDP Tampereen Datapiste Oy`,
        short_name: `TDP`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#343A40`,
        display: `minimal-ui`,
        icon: `src/images/tdp-logo-2022-512x512.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-catch-links`,
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-NK4HB4B",
        includeInDevelopment: true,
        defaultDataLayer: { platform: "gatsby" },
        routeChangeEventName: "RouteChange",
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Itim",
              variants: ["400"],
            },
            {
              family: 'Montserrat',
              variants: ["400", "400i", "700"]
            },
            {
              family: 'Lato',
              variants: ["400", "400i", "700"]
            }
          ]
        }
      }
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
          endpoint: 'https://tdp.us19.list-manage.com/subscribe/post?u=f28a68536ef9908f4464026cc&amp;id=69cee859f3', // string; add your MC list endpoint here; see instructions below
          timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    }
  ],
  mapping: {
    'Mdx.frontmatter.contactFormPerson': `Mdx.frontmatter.personName`
  },
}
