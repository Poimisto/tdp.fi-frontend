/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
// Import React so that you can use JSX in HeadComponents
const React = require("react")

const HeadComponents = [
  <script key="gtm-orig-loc" dangerouslySetInnerHTML={{__html:`
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        originalLocation: document.location.protocol + '//' +
                          document.location.hostname +
                          document.location.pathname +
                          document.location.search
      });  
  `}} />
]


exports.onRenderBody = ({
  setHeadComponents,
  setHtmlAttributes,
  setBodyAttributes
}, pluginOptions) => {
  setHeadComponents(HeadComponents)
}