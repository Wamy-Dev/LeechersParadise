import * as React from 'react';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
    ],
    buttonText: 'Buy Here',
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
      'Discord Perks',
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
        If you would like to purchase premium using a different payment method such as crypto or paypal, please make a ticket in our <a href="https://discord.gg/Ears65QWUK" style={{ textDecoration: 'underline', color: "#5865F2"}}>Discord</a> to begin the process.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main" style={{paddingBottom: "20px"}}>
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      {tier.price}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                <form action={tier.action} method={tier.method} style={{ width: "100%" }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant={tier.buttonVariant as 'outlined' | 'contained'}
                  >
                    {tier.buttonText}
                  </Button>
                  </form>
                </CardActions>
              </Card>
            </Grid>
            
          ))}
        </Grid>
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
