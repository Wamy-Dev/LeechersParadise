import { createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom'


const NewthemeDark = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#333333"
    },
    primary: {
      main: '#5E2BE2',
    },
    secondary: {
      main: '#50c878',
    },
    text: {
      primary: "#ffffff"
    },
  },
  typography: {
    fontFamily: [
      'Lato',
      'sans-serif',
    ].join(','),
  },
});
  export default function NotFound() {
      return (
        <ThemeProvider theme={NewthemeDark}>
        <CssBaseline />
          <Box display="flex" justifyContent="center" minHeight="100vh">
          <div style={{textAlign: "center", paddingLeft: "10px", paddingRight:"10px"}}>
          <h1>404, you aren't supposed to be here...</h1>
          <h3><Link to="/" style={{ textDecoration: 'underline', color: "#5E2BE2"}}>Lets take you back to the main page.</Link></h3>
          </div>
          </Box>
        <CssBaseline />
        </ThemeProvider>
      )
  }