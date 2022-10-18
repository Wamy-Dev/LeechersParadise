import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Link } from "react-router-dom";
import { TransitionProps } from "@mui/material/transitions";
import { fireAuth } from "../config/firebase.config";
import { useAuthUser } from "../hooks/AuthUser";
import { fireStore } from "../config/firebase.config";
import { signOut, updateEmail, getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
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
export default function ChangeEmail() {
  const user = useAuthUser();
  const auth = getAuth();
  const [open, setOpen] = React.useState(false);
  const [dopen, setdOpen] = React.useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handledClose = () => {
    setdOpen(false);
    signOut(fireAuth);
    window.open("https://leechersparadise.com/login", "_self");
  };
  async function step1(email, newemail) {
    //first get customerid
    const q = query(
      collection(fireStore, "users"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const customer = data.customer as string;
      step2(email, newemail, customer);
    });
  }
  async function step2(email, newemail, customer) {
    //change firebase auth email
    updateEmail(auth.currentUser!, newemail)
      .then(() => {
        step3(email, newemail, customer);
      })
      .catch((error) => {
        setOpen(true);
      });
  }
  async function step3(email, newemail, customer) {
    //update firestore
    //getid of doc
    const q = query(
      collection(fireStore, "users"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.id;
      step4(data, newemail, customer);
    });
  }
  async function step4(data, newemail, customer) {
    const Ref = doc(fireStore, "users", data);
    await updateDoc(Ref, {
      email: newemail,
    });
    step5(newemail, customer);
  }
  async function step5(newemail, customer) {
    var apiKey = process.env.REACT_APP_ADMINAPITOKEN;
    fetch("https://api.leechersparadise.com/changeemail", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: customer,
        newemail: newemail,
        apiKey: apiKey,
      }),
    })
      .then((res) => setdOpen(true))
      .catch((err) => setOpen(true));
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newemail = data.get("email") as string;
    const email = user!.email;
    console.log(email);
    console.log(newemail);
    //get customer
    step1(email, newemail);
  };
  if (user) {
    return (
      <ThemeProvider theme={NewthemeDark}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            display="flex"
            justifyContent="center"
            minHeight="100vh"
            style={{ textAlign: "center" }}
          >
            <div>
              <div style={{ textAlign: "center" }}>
                <h1>Change Email</h1>
              </div>
              <p>
                Here you can change your email. Please enter your the new email
                you would like to change your account to.
              </p>
              <ClickAwayListener onClickAway={handleTooltipClose}>
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    autoComplete="nope"
                    autoFocus
                    fullWidth
                    style={{ marginBottom: "20px", marginTop: "30px" }}
                  />
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={handleTooltipClose}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Incorrect Email"
                  >
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Tooltip>
                  <Dialog
                    open={dopen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handledClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>{"Email changed! ✨"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        We have changed your email! Please click close now and
                        relogin on the login page with your chosen email. If you
                        have any problems please open a ticket in our{" "}
                        <a
                          href="https://discord.gg/47SnjxgBFb"
                          style={{
                            textDecoration: "underline",
                            color: "#5865F2",
                          }}
                        >
                          Discord
                        </a>
                        .
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={handledClose}
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </ClickAwayListener>
            </div>
          </Box>
        </Container>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={NewthemeDark}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            display="flex"
            justifyContent="center"
            minHeight="100vh"
            style={{ textAlign: "center" }}
          >
            <Link to="/login" style={{ color: "white" }}>
              <h1>
                You must be logged in to use this page. Click here to login.
              </h1>
            </Link>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}
