/**
 * SSR for MUI v7 (Emotion) + your GTM head script
 */
const React = require("react")
const { renderToString } = require("react-dom/server")
const { CacheProvider } = require("@emotion/react")
const createEmotionServer = require("@emotion/server/create-instance").default
const createEmotionCache = require("./src/createEmotionCache")
const CssBaseline = require("@mui/material/CssBaseline").default
const {
  ThemeProvider: MuiThemeProvider,
  createTheme,
} = require("@mui/material/styles")
const {
  ThemeProvider: ScThemeProvider,
  ServerStyleSheet,
} = require("styled-components")

// Try to use your theme if present; fall back to a blank theme
let theme
try {
  const t = require("./src/theme")
  theme = t.default || t
} catch (e) {
  theme = createTheme({})
}

// Keep your GTM originalLocation script
const HeadComponents = [
  <meta
    key="emotion-insertion-point"
    name="emotion-insertion-point"
    content=""
  />,
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
]

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(HeadComponents)
}

// Extract critical CSS for Emotion/MUI during SSR (prevents FOUC)
exports.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  const sheet = new ServerStyleSheet()

  try {
    const app = (
      <CacheProvider value={cache}>
        <MuiThemeProvider theme={theme}>
          <ScThemeProvider theme={theme}>
            <CssBaseline />
            {bodyComponent}
          </ScThemeProvider>
        </MuiThemeProvider>
      </CacheProvider>
    )

    const html = renderToString(sheet.collectStyles(app))
    const chunks = extractCriticalToChunks(html)

    const emotionStyleTags = chunks.styles.map(style => (
      <style
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ))

    const styledComponentsStyleTags = sheet.getStyleElement()

    replaceBodyHTMLString(html)

    setHeadComponents([...emotionStyleTags, ...styledComponentsStyleTags])
  } finally {
    sheet.seal()
  }
}
