import { createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom'
import Divider from '@mui/material/Divider';
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
export default function About() {
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
          <li>and our secret sauce ;)</li>
          <p>If you enjoy our service, please consider <Link to="/donate" style={{ textDecoration: 'underline', color: "#50c878"}}>supporting us</Link> or signing up for our <Link to="/getpremium" style={{ textDecoration: 'underline', color: "#d4af37"}}>premium</Link> service, for us to be able to cover the costs of this project.</p>
          <p>If you have any questions or problems should occur, please notify us at contact@leechersparadise.com or message us on our Discord: <a href="https://discord.gg/VntvkN8JwB" style={{ textDecoration: 'underline', color: "#5865F2"}}> Here</a>.</p>
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
          <p>On the <Link to="/" style={{ color: "white" }}>torrent page</Link> simply copy and paste your magnet link from any of the into the textarea. Then click start download and let us work our magic.</p>
          <p>If you find that the torrent gives you an error such as "Torrent has not been cached yet. Please try again later.", this means simply that the torrent has yet to be downloaded on Real-Debrid servers and isn't available to download yet. Don't worry though, the first time you get this 
            error, it will queue the download up, and the next time you try the same magnet link, it will download like normal.
          </p>
          <p>Also please be aware that the premium links generated for you, only have a valid lifetime of up to 15 days. So if you are sharing premium links, please keep that in mind.</p>
          </div>
          <Divider />
          <div style={{textAlign: "center"}}>
          <h2 id='Hosters'>Supported Hosters</h2>
          </div>
      <BrowserView>
      <Box maxWidth={"150vh"}>
      <List sx={{ width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", paddingLeft: "10px"}} aria-label="SupportedHosters">
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
          <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/1fichier.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="1Fichier (unreliable)" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/4shared.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="4Shared" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/bayfiles.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Bayfiles" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/clicknupload.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="ClicknUpload" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/dailymotion.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Dailymotion" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/datafilehost.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="DataFileHost" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/ddlto.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="DDowload / DDL.to" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/drop.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Drop.download / DropAPK" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/easybytez.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Easybytez" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/fastclick.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Fastclick" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/fileal.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="file.al" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/filefactory.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Filefactory" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/filerio.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Filerio" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/flashbit.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Flashbit" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/gigapeta.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Gigapeta" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/googledrive.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Google Drive" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/hexupload.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="HexUpload" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/hitfile.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Hitfile" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/hulkshare.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Hulkshare" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/isracloud.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Isra.cloud" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/katfile.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="KatFile" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/loadto.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Mediafire" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/mega.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Mega" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/mixdrop.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Mixdrop" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/prefiles.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Prefiles" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/radiotunes.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="RadioTunes" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/rapidgator.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="RapidGator (unreliable)" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/redtube.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Redtube" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/scribd.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Scribd" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/sendspace.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Sendspace" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/solidfiles.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Solidfiles" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/soundcloud.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="SoundCloud" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/streamtape.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Streamtape" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/turbobit.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Turbobit" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/tusfiles.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Tusfiles" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/uloz.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Ulozto" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/uploaded.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Uploaded" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/upstream.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Upstream" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/uptobox.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Uptobox" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/userscloud.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Userscloud" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/usersdrive.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="UsersDrive" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/videobin.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="VideoBin" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/vidoza.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Vidoza" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/vimeo.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Vimeo" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/vk.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="VK" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/voe.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Voe" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/wipfiles.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Wipfiles" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/wupfile.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Wupfile / Salefiles" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/youporn.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Youporn" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/youtube.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Youtube" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/6)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/zippyshare.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Zippyshare" />
        </ListItemButton>
      </ListItem>
    </List>
    </Box>
    </BrowserView>
    <MobileView>
    <Box maxWidth={"100%"}>
    <List sx={{ width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", paddingLeft: "10px"}} aria-label="SupportedHosters"> 
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
          <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/1fichier.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="1Fichier" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/4shared.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="4Shared" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/bayfiles.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Bayfiles" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/clicknupload.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="ClicknUpload" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/dailymotion.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Dailymotion" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/datafilehost.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="DataFileHost" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/ddlto.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="DDowload / DDL.to" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/drop.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Drop.download / DropAPK" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/easybytez.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Easybytez" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/fastclick.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Fastclick" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/fileal.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="file.al" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/filefactory.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Filefactory" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/filerio.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Filerio" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/flashbit.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Flashbit" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/gigapeta.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Gigapeta" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/googledrive.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Google Drive" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/hexupload.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="HexUpload" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/hitfile.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Hitfile" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/hulkshare.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Hulkshare" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/isracloud.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Isra.cloud" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/katfile.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="KatFile" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/loadto.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Mediafire" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/mega.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Mega" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/mixdrop.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Mixdrop" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/prefiles.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Prefiles" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/radiotunes.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="RadioTunes" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/rapidgator.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="RapidGator" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/redtube.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Redtube" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/scribd.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Scribd" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/sendspace.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Sendspace" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/solidfiles.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Solidfiles" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/soundcloud.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="SoundCloud" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/streamtape.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Streamtape" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/turbobit.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Turbobit" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/tusfiles.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Tusfiles" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/uloz.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Ulozto" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/uploaded.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Uploaded" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/upstream.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Upstream" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/uptobox.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Uptobox" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/userscloud.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Userscloud" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/usersdrive.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="UsersDrive" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/videobin.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="VideoBin" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/vidoza.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Vidoza" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/vimeo.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Vimeo" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/vk.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="VK" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/voe.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Voe" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/wipfiles.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Wipfiles" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/wupfile.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Wupfile / Salefiles" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/youporn.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Youporn" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/youtube.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Youtube" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{display: "inline-block", width: "calc(100%/2)"}}>
        <ListItemButton>
        <ListItemIcon>
            <img src={"https://fcdn.real-debrid.com/0819/images/hosters/zippyshare.png"} alt="icon"></img>
          </ListItemIcon>
          <ListItemText primary="Zippyshare" />
        </ListItemButton>
      </ListItem>
    </List>
    </Box>
    </MobileView>
    
    </div>
    </Box>
    </ThemeProvider>
    )
}