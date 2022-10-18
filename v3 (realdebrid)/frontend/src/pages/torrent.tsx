import * as React from "react";
import { useState, useEffect } from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { auth, fireAuth } from "../config/firebase.config";
import { User } from "firebase/auth";
import { BrowserView, MobileView } from "react-device-detect";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
const NewthemeDark = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#333333",
    },
    primary: {
      main: "#5E2BE2",
    },
    secondary: {
      main: "#50c878",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
});
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Main = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    fireAuth.onAuthStateChanged((user) => {
      user?.getIdToken().then((token) => {
        auth.token = token;
      });
      auth.currentUser = user;
      setCurrentUser(user);
    });
  }, []);
  const [premiumLink, setPremiumLink] = React.useState("");
  const [filename, setFileName] = React.useState("");
  const [dollarGoal, setDollarGoal] = React.useState(0);
  const [dollarValue, setDollarValue] = React.useState(0);
  const [filesize, setFileSize] = React.useState(0);
  const [downloadid, setDownloadId] = React.useState("");
  const [downloadedprogress, setdownloadedprogress] = React.useState(0);
  const [tooltipopen, setTooltipOpen] = React.useState(false);
  const [tooltiptext, setToolTipText] = React.useState("")
  const [toomany, settoomany] = React.useState(false); //429 error, over 10 downloads
  const [servererror, setservererror] = React.useState(false); //500 error, server error
  const [download, setdownload] = React.useState(false); //download
  const [downloading, setdownloading] = React.useState(false); //downloading
  const [apiurl, setApiUrl] = React.useState("https://api.leechersparadise.com")//CHANGE THIS TO "http://localhost:3001" WHEN IN DEV TESTING
  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };
  const handledownload = () => {
    setdownload(false);
  };
  const handledownloading = () => {
    setdownloading(false);
  };
  const handleservererror = () => {
    //500 error, server error
    setservererror(false);
  };
  const handletoomany = () => {
    //429 error, over 10 downloads
    settoomany(false);
  };
  function deleteDownload(){
    var apiKey = process.env.REACT_APP_API_KEY;
    fetch(`${apiurl}/deletedownload`, {
      method: 'post',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        downloadid: downloadid,
        apiKey: apiKey,
      }),
    })
    .then(res => console.log('Download Success. You may now close this page.'))
    .catch(err => console.log(err))
  }
  function openLink() {
    var apiKey = process.env.REACT_APP_API_KEY;
    let loaded = 0;
    fetch(`${apiurl}/startdownload`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: premiumLink,
        apiKey: apiKey,
      }),
    })
      .then((response) => {
        const reader = response.body!.getReader();
        return new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              return reader.read().then(({ done, value }) => {
                try {
                  loaded += value!.byteLength;
                  setdownloadedprogress(loaded);
                } catch (error) {}
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                return pump();
              });
            }
          },
        });
      })
      .then((stream) => new Response(stream))
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => {
        deleteDownload();
        let a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        
      })
      .catch((err) => console.error(err));
  }
  let Logo = "";
  if (currentUser) {
    Logo = require("./assets/premium.png");
  } else {
    Logo = require("./assets/piracy_logo.png");
  }
  //fetching donation value
  useEffect(() => {
    fetch(`${apiurl}/admin`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((r) => {
        setDollarValue(r.dollarValue);
        setDollarGoal(r.dollarGoal);
      });
  }, []);
  //submitting link step 1
  const HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var entry = data.get("link");
    var array = (entry as string).split(`;`);
    var link = array[0];
    var password = array[1];
    var apiKey = process.env.REACT_APP_API_KEY;
    // fetch premium link and set premiumLink to the received value
    if (entry) {
      if (link.substring(0,4) === "http") {
        setToolTipText("Download links are not valid here, please use hoster downloading.")
        setTooltipOpen(true)
      } else {
        //if there is a link
        if (currentUser) {
          fetch(`${apiurl}/torrent`, {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              downloadLink: link,
              password: password,
              apiKey: apiKey,
              user: true,
            }),
          })
            .then((r) =>
              r.json().then((data) => ({ status: r.status, body: data }))
            )
            .then((obj) => {
              switch (obj.body.status) {
                case 200: //if link is successful
                  setDownloadId(obj.body.id);
                  setPremiumLink(obj.body.premiumLink);
                  setFileName(obj.body.filename);
                  setFileSize(obj.body.filesize);
                  setdownload(true);
                  break;
                case 404: //if link is fail
                  setToolTipText(obj.body.message)
                  setTooltipOpen(true);
                  break;
              }
            }) //if there is some kind of error
            .catch((err) => setservererror(true));
        } else {
          fetch(`${apiurl}/torrent`, {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              downloadLink: link,
              password: password,
              apiKey: apiKey,
              user: false,
            }),
          })
            .then((r) =>
              r.json().then((data) => ({ status: r.status, body: data }))
            )
            .then((obj) => {
              switch (obj.body.status) {
                case 200: //if link is successful
                  setDownloadId(obj.body.id);
                  setPremiumLink(obj.body.premiumLink);
                  setFileName(obj.body.filename);
                  setFileSize(obj.body.filesize);
                  setdownload(true);
                  break;
                case 429://if user has done too many
                  settoomany(true);
                  break;
                case 402://if torrent size too large
                  setToolTipText("Torrent too large. Please upgrade to premium to bypass this.")
                  setTooltipOpen(true);
                  break;
                case 404: //if link is fail
                  setToolTipText(obj.body.message)
                  setTooltipOpen(true);
                  break;
              }
            }) //if there is some kind of error
            .catch((err) => {
              setservererror(true)});
        }
      }
    } else {
        setToolTipText("Please enter a magnet link to download.")
        setTooltipOpen(true);
    }
  };
  //donation value
  var percentage = (dollarValue / dollarGoal) * 100;
  function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
  ) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  var downloadpercent = (downloadedprogress / filesize) * 100;
  function DownloadProgress(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  return (
    <ThemeProvider theme={NewthemeDark}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ mt: 2 }}>
            <BrowserView>
              <img
                src={Logo}
                alt="r/piracy logo"
                style={{ width: "256px" }}
              ></img>
            </BrowserView>
            <MobileView>
              <img
                src={Logo}
                alt="r/piracy logo"
                style={{ width: "192px", marginTop: "-40px" }}
              ></img>
            </MobileView>
          </Box>
          <Box sx={{ mt: 2 }}>
            <BrowserView>
              <Typography component="h1" variant="h5">
                TORRENT THE PREMIUM WAY
              </Typography>
            </BrowserView>
            <MobileView>
              <Typography component="h1" variant="h5" fontSize={20}>
                TORRENT THE PREMIUM WAY
              </Typography>
            </MobileView>
          </Box>
          <Box
            alignItems="center"
            sx={{ mt: 2, width: "95%", maxWidth: "500px" }}
          >
            <form noValidate autoComplete="off" onSubmit={HandleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                id="link"
                label="Enter your magnet link"
                name="link"
              />
              <ClickAwayListener onClickAway={handleTooltipClose}>
                <div>
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={handleTooltipClose}
                    open={tooltipopen}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={tooltiptext}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      startIcon={<FileDownloadIcon />}
                      size="large"
                      id="download"
                      sx={{ mt: 2, mb: 2 }}
                    >
                      Torrent
                    </Button>
                  </Tooltip>
                </div>
              </ClickAwayListener>
            </form>
            <Dialog
              open={download}
              onClose={handledownload}
              TransitionComponent={Transition}
            >
              <DialogTitle>Your Torrent</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  We have successfully generated your premium torrent link!
                  Please click download to begin the download. If you enjoyed
                  our service consider{" "}
                  <Link color="#50c878" href="/donate" underline="hover">
                    {"supporting"}
                  </Link>{" "}
                  us or sign up to our{" "}
                  <Link color="#d4af37" href="/getpremium" underline="hover">
                    {"premium"}
                  </Link>{" "}
                  service.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handledownload}>Close</Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    openLink();
                    handledownload();
                    setdownloading(true);
                  }}
                >
                  Start Download
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={servererror}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleservererror}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Attention! 🚩"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  We are currently experiencing issues due to the heavy load the
                  site received. We are developing a solution, but this may take
                  some time. Thank you for your patience and support.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleservererror}
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={toomany}
              TransitionComponent={Transition}
              keepMounted
              onClose={handletoomany}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"You are out of downloads! 🚩"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  You have used up your free 10 downloads for the next 24 hours.
                  If you want to avoid this in the future, consider signing up
                  for{" "}
                  <Link color="#d4af37" href="/getpremium" underline="hover">
                    {"premium"}
                  </Link>
                  . It supports LeechersParadise and gives you perks as well!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" fullWidth onClick={handletoomany}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={downloading}
              TransitionComponent={Transition}
              onClose={handledownloading}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Downloading..."}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Downloading <strong>{filename}</strong> now. You may close
                  this, but do not exit the tab. Please be patient. Depending on
                  traffic and your file size, this may take awhile.
                </DialogContentText>
                <DownloadProgress value={downloadpercent} />
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handledownloading}
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            <Grid container>
              <Grid item xs>
                <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
                  <div>
                    <Button
                      type="submit"
                      variant="outlined"
                      size="small"
                      color="secondary"
                      sx={{ mt: 1, mb: 1 }}
                    >
                      <Link color="#50c878" href="./donate" underline="hover">
                        {"Support us"}
                      </Link>
                    </Button>
                  </div>
                </Box>
                <Box sx={{ width: "100%", alignItems: "center" }}>
                  <Typography component="h1" variant="subtitle1">
                    <br /> Donation Goal:&nbsp;${dollarGoal}
                  </Typography>
                  <LinearProgressWithLabel value={percentage} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Main;
