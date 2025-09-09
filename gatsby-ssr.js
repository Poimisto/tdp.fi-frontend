/**
 * SSR for MUI v7 (Emotion) + your GTM head script
 */
const React = require("react");
const { renderToString } = require("react-dom/server");
const { CacheProvider } = require("@emotion/react");
const createEmotionServer = require("@emotion/server/create-instance").default;
const createEmotionCache = require("./src/createEmotionCache");
const { ThemeProvider, CssBaseline, createTheme } = require("@mui/material");

// Try to use your theme if present; fall back to a blank theme
let theme;
try {
  const t = require("./src/theme");
  theme = t.default || t;
} catch (e) {
  theme = createTheme({});
}

// Keep your GTM originalLocation script
const HeadComponents = [
  <script
    key="gtm-orig-loc"
    dangerouslySetInnerHTML={{
      __html: `
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        originalLocation: document.location.protocol + '//' +
                          document.location.hostname +
                          document.location.pathname +
                          document.location.search
      });
    `,
    }}
  />,
];

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(HeadComponents);
};

// Extract critical CSS for Emotion/MUI during SSR (prevents FOUC)
exports.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  const app = (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {bodyComponent}
      </ThemeProvider>
    </CacheProvider>
  );

  const html = renderToString(app);
  const chunks = extractCriticalToChunks(html);

  const emotionStyleTags = chunks.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  replaceBodyHTMLString(html);
  setHeadComponents(emotionStyleTags);
};
