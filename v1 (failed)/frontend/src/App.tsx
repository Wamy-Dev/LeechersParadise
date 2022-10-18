import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Logo from '../src/piracy_logo.png';
import Monero from '../src/monero.png';
import Bitcoin from '../src/bitcoin2.png';
import Etherium from '../src/etherium.png';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';


const themeDark = createTheme({
  palette: {
    mode: 'dark',
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
    }
  }
});

function LinkDialog({link, handleClose}: {link: string | null, handleClose: () => void}) {
  // Dont render dialog if link is null (empty)
  if(link === null) {
    return null;
  }

  function openLink() {
    window.open(link as string, '_blank');
  }

  return <Dialog open={true} onClose={handleClose}>
    <DialogTitle>Download</DialogTitle>
    <DialogContent>
      <DialogContentText>
        We have successfully generated your premium download link!
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
      <Button onClick={openLink} variant="contained" color="primary">Download</Button>
    </DialogActions>
  </Dialog>
}

export default function App() {
  const filehosters = [ 'hitfile', 'nitroflare', 'mediafire', 'zippyshare', 'rapidgator', '1 Fichier','4Shared','Mega'];
  const [premiumLink, setPremiumLink] = React.useState(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const link = data.get('link')
    const hoster = data.get('filehosters')
    
    console.log("link: ",link, "hoster: ",hoster)

    // fetch premium link and set premiumLink to the received value
    fetch('/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        downloadLink: link,
        hoster: hoster,
      }),
    })
      .then(response => response.json())
      .then(r => setPremiumLink(r.premiumLink))
  };

  // when closing the dialog set the premiumLink to null
  function closeDialog() {
    setPremiumLink(null);
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
//Progress Bar
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }


  return (
    <ThemeProvider theme={themeDark}>
      <Container component="main" maxWidth="md">
        <CssBaseline />

        <LinkDialog link={premiumLink} handleClose={closeDialog}/>

        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ mt: 2 }}>
            <img src={Logo} alt="r/piracy logo"></img>
          </Box>

          <Box sx={{ mt: 2 }}>
          <Typography component="h1" variant="h5">
            DOWNLOAD THE PREMIUM WAY
          </Typography>
          </Box>
            <Box sx={{ mt: 2 }}>
              <form noValidate autoComplete='off' onSubmit={handleSubmit} >
              <TextField 
                margin="normal"
                required
                fullWidth
                id="link"
                label="Enter your download link" 
                name="link"
                
              />
              <Autocomplete  
                disablePortal
                fullWidth
                id="filehosters"
              
                options={filehosters}
                renderInput={(params) => <TextField {...params} name="filehosters"
                label="Supported filehosters" />}
          
              />

              <div>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained" startIcon={<FileDownloadIcon/>}
                      size="large"
                      id="download"
                      sx={{ mt: 2, mb: 2 }}
                      >
                      Download
                    </Button>

                  </div>
              </form>

            <Grid container>
              <Grid item xs>
                <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
                <div>
                <Button onClick = {handleClickOpen} 
                  type="submit"
                  variant="outlined" 
                  size="small"
                  color="secondary"
                  sx={{ mt: 1, mb: 1 }}
                >
                  Donate
                </Button>
                 <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Donate</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        If you like this service please consider donating to support the further development of this projectso we can cover our server and development costs.<br/><br/>

                        You can choose to donate via
                        <br/><br/>
                        Monero:
                        <br/><br/>
                        <img src={Monero} alt="r/monero"></img>
                        <br/>
                        47EkhCAEP8A3ttbPEGHJ95frpbcXXE5cdPRZdPhT4RfVSM7xcB3dVWMFe<br/>cHrEE8dNFBX66hai46SeZz2GvYhgPtCB7vJvW5
                        <br/><br/>
                        Bitcoin:<br/><br/>
                        <img src={Bitcoin} alt="r/bitcoin"></img>
                        <br/>
                        bc1qaq664eu6gcggkudqel7fash7k5dkhtvkj3efw4
                        
                        <br/><br/>
                        Etherium:<br/><br/>
                        <img src={Etherium} alt="r/bitcoin"></img>
                        <br/>
                        0xAC822942B96014e3899e0D5e129b1f8A9727d9d2
                      </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                      </Dialog>
                </div>
                </Box>
                
                <Box sx={{ width: '100%', alignItems: 'center' }}>
                <Typography component="h1" variant="subtitle1">
                  <br/>  Donation Goal &nbsp;$1
                </Typography>
                 <LinearProgressWithLabel value={0} />
                </Box>
                <Box  sx={{ mt: 15 }}>
                  <Typography component="h1" variant="subtitle1">
                    Contact us for support on Discord: (placeholder)
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


