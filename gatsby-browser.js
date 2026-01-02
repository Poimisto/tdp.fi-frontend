/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import { CacheProvider } from "@emotion/react"
import createEmotionCache from "./src/createEmotionCache"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import { ThemeProvider as ScThemeProvider } from "styled-components"
import CssBaseline from "@mui/material/CssBaseline"
import theme from "./src/theme"

const clientSideEmotionCache = createEmotionCache()

export const wrapRootElement = ({ element }) => (
  <CacheProvider value={clientSideEmotionCache}>
    <MuiThemeProvider theme={theme}>
      <ScThemeProvider theme={theme}>
        <CssBaseline />
        {element}
      </ScThemeProvider>
    </MuiThemeProvider>
  </CacheProvider>
)

// Optional: if you enable gatsby-plugin-offline, auto-reload on SW updates
export const onServiceWorkerUpdateReady = () => {
  if (typeof window !== "undefined") window.location.reload()
}
