/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './src/theme';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {element}
  </ThemeProvider>
);
// Optional: if you enable gatsby-plugin-offline, auto-reload on SW updates
export const onServiceWorkerUpdateReady = () => {
  if (typeof window !== "undefined") window.location.reload();
};