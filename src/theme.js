import { createTheme } from '@mui/material/styles';

const base = {
  containerMaxWidth: 1080,
  colors: {
    brand: '#fbc23c',
    brandSecondary: '#ffb500',
    success: '#5DE744',
    danger: '#B70000',
    dark: '#343A40',
    darkest: '#111',
    light: '#f3f3f3',
    lightest: '#fff',
    link: '#0f89d4',
  },
  bodyFontFamily: 'Lato, sans-serif',
  headingFontFamily:
    '-apple-system,BlinkMacSystemFont,"Montserrat",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
  dropCapsFontFamily: 'Itim',
  bodyLineHeight: '150%',
  fontSize: '100%',
  mobileBreakpoint: 762,
};

// MUI theme (needed by CssBaseline etc.)
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: base.colors.dark },
    secondary: { main: base.colors.brand },
    background: { default: base.colors.lightest },
    text: { primary: base.colors.darkest },
    success: { main: base.colors.success },
    error: { main: base.colors.danger },
  },
  typography: {
    fontFamily: base.bodyFontFamily,
    fontWeightBold: 700, 
  },
  shape: { borderRadius: 8 },
});

Object.assign(theme, base);

export default theme;
