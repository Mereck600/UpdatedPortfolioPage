import { createTheme } from '@mui/material/styles';


const theme = createTheme({
palette: {
    mode: 'dark',
    mode: 'dark',
    primary: { main: '#90caf9' },
    background: {
      default: '#000000',
      paper: '#0f0f10',
    },
    text: {
        primary: '#e5e7eb',
        secondary: '#9ca3af',
        dark: '#283618',
    },
    },
    shape: { borderRadius: 16 },
    components: {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        height: '100%',
      },
      body: {
        minHeight: '100%',
        background: 'linear-gradient(180deg, #000000 0%, #1a0033 100%)',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
      '#__next': {
        minHeight: '100%',
      },
    },
  },

  MuiCard: {
    defaultProps: { elevation: 8 },
    styleOverrides: {
      root: {
        background: 'linear-gradient(180deg, #27272a 0%, #18181b 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
      },
    },
  },
},
    typography: {
        fontFamily: [
        'Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'
        ].join(','),
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        },
    });


export default theme;
