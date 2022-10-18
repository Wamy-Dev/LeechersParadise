import { createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom'
import Monero from './assets/monero.png';
import Bitcoin from './assets/bitcoin.png';
import Etherium from './assets/etherium.png';
import cocodahog from './assets/cocodahog.png';
import wamy from './assets/wamy.png';
import mocrosoft from './assets/mocrosoft.png';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { BrowserView } from 'react-device-detect';

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
export default function About() {
    return (
      <ThemeProvider theme={NewthemeDark}>
        <CssBaseline />
          <Box display="flex" justifyContent="center" minHeight="100vh">
          <div style={{paddingBottom: "40px", width: "100%", maxWidth: "1400px"}}>
          <div style={{textAlign: "center"}}>
          <h1>Support LeechersParadise</h1>
          </div>
          <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
          <p>Hi!</p>
          <p>Thank you for considering to support our project.</p>
          <p>If you enjoy this service, donate today, so we can use 100% of your support to further develop this project.</p>
          </div>
          <Divider />
          <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
          <p>You can choose to support us via cryptocurrencies:</p>
          <div style={{textAlign: "center"}}>
          <h3>Monero</h3>
          <img src={Monero} alt="r/monero"></img>
          <BrowserView>
          <p>46XuKBQPLjrfdoKB7oXRyo2dZETJFF7xmSparT7iLjSJ14KohnyCKVeTzo7sdC2A8HUty9PHQyUjpJkhGm9kLVc4HhUjE6q</p>
          </BrowserView>
          <CopyToClipboard text={"46XuKBQPLjrfdoKB7oXRyo2dZETJFF7xmSparT7iLjSJ14KohnyCKVeTzo7sdC2A8HUty9PHQyUjpJkhGm9kLVc4HhUjE6q"}>
          <Button
          variant="contained">Copy XMR Address
          </Button>
          </CopyToClipboard>
          <h3>Bitcoin</h3>
          <img src={Bitcoin} alt="r/bitcoin"></img>
          <BrowserView>
          <p>bc1q9x28smqehp4semejjkfs2slr8gugej0fpw5rdx</p>
          </BrowserView>
          <CopyToClipboard text={"bc1q9x28smqehp4semejjkfs2slr8gugej0fpw5rdx"}>
          <Button
          variant="contained">Copy BTC Address
          </Button>
          </CopyToClipboard>
          <h3>Etherium</h3>
          <img src={Etherium} alt="r/bitcoin"></img>
          <BrowserView>
          <p>0xe4E96A7833c1A43187A88870566a83e37386BA25</p>
          </BrowserView>
          <CopyToClipboard text={"0xe4E96A7833c1A43187A88870566a83e37386BA25"}>
          <Button
          style={{ marginBottom: "20px"}}
          variant="contained"
          >Copy ETH Address
          </Button>
          </CopyToClipboard>
          <Divider />
          <h3>PayPal</h3>
          </div>
          <p>You may choose to donate to any of these PayPal links. These are each of the developers that brought this project togther:</p>
          <div style={{textAlign: "center"}}>
          <h4>Wamy</h4>
          <img src={wamy} alt="wamy" style={{ width: "240px", borderRadius: "8px"}}></img>
          <p>Donate to <meta http-equiv="X-UA-Compatible" content="IE=7" />: <a href="https://www.paypal.com/paypalme/DavidNovencido" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: "#50c878"}}> Here</a></p>
          </div>
          <Divider />
          <p>If you have any questions or problems should occur, please notify us on contact@leechersparadise.com or message us on our Discord: <a href="https://discord.gg/VntvkN8JwB" style={{ textDecoration: 'underline', color: "#5865F2"}}> Here</a>.</p>
          <p>Do you hate crypto and think it's stupid, but still want to support our cause?<br/> Then you should consider signing up to <Link to="/getpremium" style={{ textDecoration: 'underline', color: "#d4af37"}}>premium</Link>.</p>
          </div>
          </div>
          </Box>
      </ThemeProvider>
    )
}