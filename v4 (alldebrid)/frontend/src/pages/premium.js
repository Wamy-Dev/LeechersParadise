import * as React from 'react';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from "@mui/material/Link";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import PayPalLogo from './assets/paypal.png'
import StripeLogo from './assets/stripe.png'
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
const tiers = [
  {
    title: 'Free',
    subheader: 'Anonymous User',
    price: '$0',
    description: [
      'All features',
      'Download 10 files/day',
      '50gb File Cap'
    ],
    buttonText: 'Default',
    buttonVariant: 'disabled',
  },
  {
    title: 'Premium',
    subheader: 'Unlocks Premium',
    link: 'premium',
    price: '$2/month',
    action: "https://api.leechersparadise.com/create-checkout-session",
    method: "POST",
    description: [
      'All features',
      'Unlimited Downloads',
      'Unlimited File Sizes',
      'Priority Discord Support',
      'Download Manager Access'
    ],
    buttonText: 'Buy Monthly',
    buttonVariant: 'contained',
  },
  {
    title: 'Donate',
    subheader: 'Supports Us',
    link: 'donate',
    price: '♾',
    action: "donate",
    buttonid: "donatebutton",
    method: "GET",
    description: [
      'Support LeechersParadise',
      'Priority Discord Support',
      'Your name in source code'
    ],
    buttonText: 'Support Here',
    buttonVariant: 'contained',
  },
];
function PricingContent() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6, pl: "5px", pr: '5px'}}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="#d4af37"
          gutterBottom
        >
          Premium
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Not only does this help support us by providing for our monthly costs but you also get perks by signing up for premium.
        </Typography>
        <Typography align="center" color="text.secondary" component="h5">
          Please sign up using a valid email! If you already have an acount, do not purchase using the same email as your previous account! If you would like to purchase using a different method please contact us <Link href="/support">here.</Link>
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="lg" component="main" style={{paddingBottom: "20px"}}>
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      <stripe-pricing-table pricing-table-id=""
      publishable-key="">
      </stripe-pricing-table>
      </Container>
    </React.Fragment>
  );
}
export default function Premium() {
  return (
    <ThemeProvider theme={NewthemeDark}>
      <PricingContent />
    </ThemeProvider>
  )
}
