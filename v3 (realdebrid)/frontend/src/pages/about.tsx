import { createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom'
import Divider from '@mui/material/Divider';
import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { BrowserView, MobileView } from 'react-device-detect';
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

export default function About () {
  const [statusData, setData] = useState([]);
  useEffect(() => {
    GetData();
  }, []);
  const GetData = () => {
    fetch('http://localhost:3001/status',
    {
      method: 'GET',
    }).then(r => r.json()).then(data => {
      setData(data)
    })
  }
    return (
      <ThemeProvider theme={NewthemeDark}>
        <CssBaseline />
          <Box display="flex" justifyContent="center" minHeight="100vh" >
          <div style={{width: "100%", maxWidth: "1400px"}}>
          <div style={{textAlign: "center"}}>
          <h1>About LeechersParadise</h1>
          </div>
          <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
          <p>Hi!</p>
          <p>We are Leecher's Paradise, the best place for leeches to suck us dry!</p>
          <p>But what do we do? We offer you a way to bypass those filehoster dickheads (rapidgator, hitfile etc.), their atrocious download speeds and their waste of money premium accounts.</p>
          <p>Our amazing service can be used for all different purposes but certainly not piracy, and we staunchly oppose this immoral practice ;)</p>
          </div>
          <Divider />
          <div style={{textAlign: "center"}}>
          <h2>For those annoying nerds like us, LeechersParadise was built with:</h2>
          </div>
          <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
          <li>Typescript</li>
          <li>Material-UI</li>
          <li>Firebase</li>
          <li>Express </li>
          <li>and our secret sauce 🤭</li>
          <p>If you enjoy our service, please consider <Link to="/donate" style={{ textDecoration: 'underline', color: "#50c878"}}>supporting us</Link> or signing up for our <Link to="/getpremium" style={{ textDecoration: 'underline', color: "#d4af37"}}>premium</Link> service, for us to be able to cover the costs of this project.</p>
          <p>If you have any questions or problems should occur, please notify us at contact@leechersparadise.com or message us on our Discord: <a href="https://discord.gg/47SnjxgBFb" style={{ textDecoration: 'underline', color: "#5865F2"}}> Here</a>.</p>
          </div>
          <Divider />
          <div style={{textAlign: "center"}}>
          <h2>How to download</h2>
          </div>
          <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
          <p>On the <Link to="/" style={{ color: "white" }}>main page</Link> simply copy and paste your download link from any of the <a href="#Hosters" style={{ color: "white" }}>supported hosters</a> into the textarea. Then click start download and let us work our magic.</p>
          <p>If you have a link that requires a password to download, paste the link into the box like normal, but then add a semicolon following with your password. It would look a little something like this: <strong>https://1fichier.com/?c4xyb3g5gtmtqrwhv9nv;anexamplepassword</strong>.</p> 
          <p>Once a link has already been downloaded with a password, our service automatically remembers the password for that exact same link. So if you want to download the same password protected link again, you wont need a password, pretty cool right?</p>
          <p>Also please be aware that the premium links generated for you, only have a valid lifetime of up to 15 days. So if you are sharing premium links, please keep that in mind.</p>
          </div>
          <Divider />
          <div style={{textAlign: "center"}}>
          <h2>How to torrent</h2>
          </div>
          <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
          <p>On the <Link to="/torrent" style={{ color: "white" }}>torrent page</Link> simply copy and paste your magnet link from any of the into the textarea. Then click start download and let us work our magic.</p>
          <p>If you find that the torrent gives you an error such as "Torrent has not been cached yet. Please try again later.", this means simply that the torrent has yet to be downloaded on Real-Debrid servers and isn't available to download yet. Don't worry though, the first time you get this 
            error, it will queue the download up, and the next time you try the same magnet link, it will download like normal.
          </p>
          </div>
          <Divider />
          <div style={{textAlign: "center"}}>
          <h2 id='Hosters'>Supported Hosters</h2>
          <p><span style={{color: "#33833E"}}>Green</span> means the hoster is available, <span style={{color: "#981617"}}>Red</span> means the hoster is down.</p>
          </div>
          <BrowserView>
            <Box maxWidth={"150vh"}>
            <List sx={{ width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", paddingLeft: "10px"}} aria-label="SupportedHosters">
            <div>
              {Object.keys(statusData).map((key, index) => {
                return statusData[key].status === 'up' ? 
                <ListItem key={index} disablePadding sx={{borderRadius: "10px", backgroundColor: "#33833E", display: "inline-block", marginLeft: "10px", marginRight: "10px", marginTop: "10px", marginBottom:"10px", width: "calc(100%/6)"}}>
                  <ListItemButton>
                  <ListItemIcon>
                    <img src={statusData[key].image} alt="icon"></img>
                  </ListItemIcon>
                  <ListItemText primary={key} />
                </ListItemButton>
                </ListItem>
                :
                <ListItem key={index} disablePadding sx={{borderRadius: "10px", backgroundColor: "#981617", marginLeft: "10px", marginRight: "10px",marginTop: "10px", marginBottom:"10px", display: "inline-block", width: "calc(100%/6)"}}>
                  <ListItemButton>
                  <ListItemIcon>
                    <img src={statusData[key].image} alt="icon"></img>
                  </ListItemIcon>
                  <ListItemText primary={key} />
                </ListItemButton>
                </ListItem>
            })}
            </div>
            </List>
            </Box>
          </BrowserView>
          <MobileView>
            <Box maxWidth={"96vw"}>
            <List sx={{ width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", paddingLeft: "10px"}} aria-label="SupportedHosters">
            <div>
              {Object.keys(statusData).map((key, index) => {
                return statusData[key].status === 'up' ? 
                <ListItem key={index} disablePadding sx={{borderRadius: "10px", backgroundColor: "#33833E", display: "inline-block", marginLeft: "5px", marginRight: "5px", marginTop: "10px", marginBottom: "5px", width: "96vw"}}>
                  <ListItemButton>
                  <ListItemIcon>
                    <img src={statusData[key].image} alt="icon"></img>
                  </ListItemIcon>
                  <ListItemText primary={key} />
                </ListItemButton>
                </ListItem>
                :
                <ListItem key={index} disablePadding sx={{borderRadius: "10px", backgroundColor: "#981617", marginLeft: "5px", marginRight: "5px", marginTop: "10px", marginBottom: "5px", display: "inline-block", width: "96vw"}}>
                  <ListItemButton>
                  <ListItemIcon>
                    <img src={statusData[key].image} alt="icon"></img>
                  </ListItemIcon>
                  <ListItemText primary={key} />
                </ListItemButton>
                </ListItem>
            })}
            </div>
            </List>
            </Box>
          </MobileView>
      </div>
    </Box>
    </ThemeProvider>
    )
}