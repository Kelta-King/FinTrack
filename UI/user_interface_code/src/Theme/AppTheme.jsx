// Install dependencies if you haven't:
// npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

import { createTheme } from '@mui/material/styles';

// Custom Theme Configuration
const THEME = createTheme({
    palette: {
        primary: {
            main: '#026197' // Rich blue for primary actions
        },
        secondary: {
            main: '#36d087' // Vibrant green for accents
        },
        background: {
            default: '#f6f6f6', // Light grey background for the app
            paper: '#FFFFFF' // White background for cards and paper elements
        },
        text: {
            primary: '#1A1A1A', // Dark grey for main text
            secondary: '#606060' // Light grey for secondary text
        }
    },
    typography: {
        fontFamily: `"Lato", "Amiko", "Roboto", "Helvetica", "Arial", sans-serif`,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        h1: {
            fontSize: '2rem',
            fontWeight: 500,
            color: '#026197',
            letterSpacing: '0.02em'
        },
        h2: {
            fontSize: '1.75rem',
            fontWeight: 500,
            color: '#026197'
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 400,
            color: '#606060'
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#1A1A1A'
        },
        button: {
            fontWeight: 500,
            textTransform: 'none'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: "#FFFFFF",
                    fontSize: 16,
                    backgroundColor: '#36d087',
                    '&:hover': {
                        backgroundColor: '#2cc175'
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: '8px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' // Subtle shadow for cards
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: '#026197'
                }
            }
        }
    }
});

export default THEME;
