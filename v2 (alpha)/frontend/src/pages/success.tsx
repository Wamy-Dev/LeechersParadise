import { createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
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
export default function Success() {
    return (
      <ThemeProvider theme={NewthemeDark}>
        <Container component="main">
          <CssBaseline />
          <Typography component="h1" variant="h5">
          <br/><br/>Purchase Success!
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2, width: "100%"}}>
            <Typography > 
            <br/>We have successfully purchased your premium order!
            <br/><br/>Please check the email you used to purchase for your credentials. <br/> If there is something wrong with your purchase please email: contact@leechersparadise.com for help, or message a dev at our Discord: <a href="https://discord.gg/VntvkN8JwB" style={{ textDecoration: 'underline', color: "#5865F2"}}> Here</a>.
            <br/> We hope you use your account well, and enjoy the benefits that come with having premium!
            <br/> Thank you again for supporting LeechersParadise!
            <br/><br/><br/>-Love, The Devs
            <br/><br/><br/>You may now log in using your credentials <a href="https://leechersparadise.com/login" style={{ textDecoration: 'underline', color: "#5E2BE2"}}> Here</a>, or just return to the main page, <a href="https://leechersparadise.com/" style={{ textDecoration: 'underline', color: "#5E2BE2"}}> Here</a>.
            </Typography>
          </Box>
          <CssBaseline />
        </Container>
      </ThemeProvider>
    )
}