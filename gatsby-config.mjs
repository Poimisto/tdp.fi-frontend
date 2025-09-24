import "dotenv/config.js";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import settings from './content/settings.json' with { type: 'json'};
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  siteMetadata: settings,
  plugins: [
    // Styling / head
    `gatsby-plugin-emotion`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,

    // Images
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    // MDX for .mdx and .md
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              backgroundColor: "transparent",
              linkImagesToOriginal: false,
              disableBgImageOnAlpha: true,
            },
          },
        ],
        mdxOptions: {
          remarkPlugins: [
            // Add support for GitHub Flavoured Markdown (GFM).
            // Mainly used for tables.
            remarkGfm
          ],
          rehypePlugins: [
            // Generates heading IDs for use in article table-of-contents.
            [rehypeSlug, { prefix: "\\" }]
          ]
        }
      },
    },

    // JSON transformer
    `gatsby-transformer-json`,

    // Filesystem sources
    // NOTE: Decap writes to static/assets and serves them as /assets
    { resolve: `gatsby-source-filesystem`, options: { name: `uploads`, path: `${__dirname}/static/assets` } },
    { resolve: `gatsby-source-filesystem`, options: { name: `posts`, path: `${__dirname}/content/posts` } },
    { resolve: `gatsby-source-filesystem`, options: { name: `pages`, path: `${__dirname}/content/pages` } },
    { resolve: `gatsby-source-filesystem`, options: { name: `people`, path: `${__dirname}/content/people` } },
    { resolve: `gatsby-source-filesystem`, options: { name: `forms`, path: `${__dirname}/content/forms` } },
    { resolve: `gatsby-source-filesystem`, options: { name: `variables`, path: `${__dirname}/content/variables` } },

    // Decap CMS (modern Netlify CMS)
    {
      resolve: `gatsby-plugin-decap-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        cmsConfig: `/static/admin/config.yml`,
      },
    },

    // Manifest / PWA
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `TDP Tampereen Datapiste Oy`,
        short_name: `TDP`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#343A40`,
        display: `minimal-ui`,
        icon: `src/images/tdp-logo-2022-512x512.png`,
      },
    },
    // `gatsby-plugin-offline`, // optional

    // Routing & GTM
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: `GTM-NK4HB4B`,
        includeInDevelopment: true,
        defaultDataLayer: { platform: `gatsby` },
        routeChangeEventName: `RouteChange`,
      },
    },

    // Webfonts
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            { family: `Itim`, variants: [`400`] },
            { family: `Montserrat`, variants: [`400`, `400i`, `700`] },
            { family: `Lato`, variants: [`400`, `400i`, `700`] },
          ],
        },
      },
    },

    // Mailchimp
    {
      resolve: `gatsby-plugin-mailchimp`,
      options: {
        endpoint:
          "https://tdp.us19.list-manage.com/subscribe/post?u=f28a68536ef9908f4464026cc&amp;id=69cee859f3",
        timeout: 3500,
      },
    },
  ],
};
