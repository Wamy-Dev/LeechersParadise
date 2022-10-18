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
import { HashLink } from 'react-router-hash-link';
import { auth, fireAuth } from "../config/firebase.config";
import { User } from "firebase/auth";
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [statusData, setData] = useState([]);
  useEffect(() => {
    fireAuth.onAuthStateChanged((user) => {
      user?.getIdToken().then((token) => {
        auth.token = token;
      });
      auth.currentUser = user;
      setCurrentUser(user);
      GetData(user);
    });

  }, []);
  const GetData = (user) => {
    if (user) {
      fetch('https://api.leechersparadise.com/premiumstatus',
    {
      method: 'GET',
    }).then(r => r.json()).then((data) => {
      Object.keys(data).forEach(key => {
        if (typeof data[key].status === 'undefined') {
          delete data[key];
        }
      })
      setData(data)
    })
    } else {
      fetch('https://api.leechersparadise.com/status',
    {
      method: 'GET',
    }).then(r => r.json()).then((data) => {
      Object.keys(data).forEach(key => {
        if (typeof data[key].status === 'undefined') {
          delete data[key];
        }
      })
      setData(data)
    })
    }
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
          <p>But what do we do? We offer you a way to bypass those filehoster dickheads (Rapidgator, Hitfile, 1Fichier, etc.), their atrocious download speeds and their waste of money premium accounts.</p>
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
          <p>If you have any questions or problems should occur, please notify us at <a style={{color: "white"}} href="mailto:contact@leechersparadise.com?subject=(Put%20your%20inquiry%20here)%20-%20(your%20username%2C%20name%20or%20alias)">contact@leechersparadise.com</a> or message us on our Discord: <a href="https://discord.gg/47SnjxgBFb" style={{ textDecoration: 'underline', color: "#5865F2"}}> Here</a>. You may also view our policies <Link style={{color: "white"}} to="/policies">here</Link>.</p>
          </div>
          <Divider />
          <div style={{textAlign: "center"}}>
          <h2>How to download</h2>
          </div>
          <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
          <p>On the <Link to="/" style={{ color: "white" }}>main page</Link> simply copy and paste your download link from any of the <HashLink to="#Hosters" style={{ color: "white" }}>supported hosters</HashLink> into the textarea. Then click start download and let us work our magic.</p>
          <p>If you have a link that requires a password to download, paste the link into the box like normal, but then add a semicolon following with your password. It would look a little something like this: <strong>https://1fichier.com/?c4xyb3g5gtmtqrwhv9nv;anexamplepassword</strong>.</p> 
          <p>If you want to share a download link with someone you can send a link that looks like this: <strong><a style={{color: "white"}} href="https://leechersparadise.com?link=1fichier.com/?c4xyb3g5gtmtqrwhv9nv;anexamplepassword">https://leechersparadise.com/?link=1fichier.com/?c4xyb3g5gtmtqrwhv9nv;anexamplepassword</a></strong>. This will take you to the download page with the file already in the text box.
          For any other link just add the download link like <strong>https://leechersparadise.com?link=YOURLINKGOESHERE</strong>.
          </p>
          </div>
          <Divider />
          <div style={{textAlign: "center"}}>
          <h2>How to torrent</h2>
          </div>
          <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
          <p>On the <Link to="/torrent" style={{ color: "white" }}>torrent page</Link> simply copy and paste your magnet link from any of the into the textarea. Then click start download and let us work our magic. You will get a seperate download link for each of the files (unless the entire download is a zip, gzip, or rar file) that you can just click on to easily download it.</p>
          <p>If you find that the torrent gives you an error such as "File not downloaded on hosters yet. Please try again later.", this means simply that the torrent has yet to be downloaded on the servers and isn't available to download yet. Don't worry though, the first time you get this 
            error, it will queue the download up, and the next time you try the same magnet link, it will download like normal.
          </p>
          </div>
          <Divider />
          <div style={{textAlign: "center"}}>
          <h2>Speeds</h2>
          </div>
          <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
          <p>LeechersParadise prides itself in being extremely fast. We offer a way to check how fast your download speeds will be on LeechersParadise by taking a speedtest, which tests your speed to our servers. You may try it <a style={{ color: "white" }} href="https://speedtest.leechersparadise.com">here</a>. This will be
          an accurate reflection of the download speeds you will get from LeechersParadise.</p>
          <p>LeechersParadise runs on a 1Gbps connection which will ensure that everyone connecting and downloading will get their full internet speed. This is a reminder that LeechersParadise can only download as fast as your internet speed is. Please take the <a style={{ color: "white" }} href="https://speedtest.leechersparadise.com">speedtest</a> to find out your connection speed.</p>
          </div>
          <Divider />
          <div style={{textAlign: "center"}}>
          <h2 id='Hosters'>Supported Hosters</h2>
          <p><span style={{color: "#33833E"}}>Green</span> means the hoster is available, <span style={{color: "#981617"}}>Red</span> means the hoster is down and you cannot download from them at this time. These are updated every 10 minutes.</p>
          </div>
          <BrowserView>
            <Box maxWidth={"150vh"}>
            <List sx={{ width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", paddingLeft: "10px"}} aria-label="SupportedHosters">
            <div>
              {Object.keys(statusData).map((key, index) => {
                return statusData[key].status === true && statusData[key].quota !== 0 ? 
                <ListItem key={index} disablePadding sx={{borderRadius: "10px", backgroundColor: "#33833E", display: "inline-block", marginLeft: "10px", marginRight: "10px", marginTop: "10px", marginBottom:"10px", width: "calc(100%/6)"}}>
                  <ListItemButton href={'https://' + statusData[key].domains[0]} sx={{borderRadius: "10px"}}>
                  <ListItemIcon>
                    <img src={'https://www.google.com/s2/favicons?domain=' + statusData[key].domains[0]} alt={statusData[key].domains[0]}></img>
                  </ListItemIcon>
                  <ListItemText style={{ textTransform: "capitalize"}} primary={key} />
                  </ListItemButton>
                </ListItem>
                :
                <ListItem key={index} disablePadding sx={{borderRadius: "10px", backgroundColor: "#981617", marginLeft: "10px", marginRight: "10px",marginTop: "10px", marginBottom:"10px", display: "inline-block", width: "calc(100%/6)"}}>
                  <ListItemButton href={'https://' + statusData[key].domains[0]} sx={{borderRadius: "10px"}}>
                  <ListItemIcon>
                    <img src={'https://www.google.com/s2/favicons?domain=' + statusData[key].domains[0]} alt={statusData[key].domains[0]}></img>
                  </ListItemIcon>
                  <ListItemText style={{ textTransform: "capitalize"}} primary={key} />
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
                return statusData[key].status === true && statusData[key].quota !== 0 ? 
                <ListItem key={index} disablePadding sx={{borderRadius: "10px", backgroundColor: "#33833E", display: "inline-block", marginLeft: "5px", marginRight: "5px", marginTop: "10px", marginBottom: "5px", width: "96vw"}}>
                  <ListItemButton href={'https://' + statusData[key].domains[0]} sx={{borderRadius: "10px"}}>
                  <ListItemIcon>
                    <img src={'https://www.google.com/s2/favicons?domain=' + statusData[key].domains[0]} alt={statusData[key].domains[0]}></img>
                  </ListItemIcon>
                  <ListItemText style={{ textTransform: "capitalize"}} primary={key} />
                  </ListItemButton>
                </ListItem>
                :
                <ListItem key={index} disablePadding sx={{borderRadius: "10px", backgroundColor: "#981617", marginLeft: "5px", marginRight: "5px", marginTop: "10px", marginBottom: "5px", display: "inline-block", width: "96vw"}}>
                  <ListItemButton href={'https://' + statusData[key].domains[0]} sx={{borderRadius: "10px"}}>
                  <ListItemIcon>
                    <img src={'https://www.google.com/s2/favicons?domain=' + statusData[key].domains[0]} alt={statusData[key].domains[0]}></img>
                  </ListItemIcon>
                  <ListItemText style={{ textTransform: "capitalize"}} primary={key} />
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