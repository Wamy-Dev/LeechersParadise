import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { fireAuth } from "../config/firebase.config";
import { useAuthUser } from "../hooks/AuthUser";
import { fireStore } from "../config/firebase.config";
import PersonOutline from "@mui/icons-material/PersonOutline";
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
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {""}
      <Link to="/" style={{ color: "white" }}>
        LeechersParadise
      </Link>{" "}
      {new Date().getFullYear()}
      {" - Present"}
    </Typography>
  );
}
export default function UserPanel() {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState("");
  const user = useAuthUser();
  const handleTooltipClose = () => {
    setOpen(false);
  };
  async function handleCustomer(email) {
    const q = query(
      collection(fireStore, "users"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      const customer = data.customer as string;
      setCustomer(customer);
    });
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const user = data.get("user") as string;
    const password = data.get("password") as string;
    signInWithEmailAndPassword(fireAuth, user, password).catch((error) => {
      setOpen(true);
    });
    event.preventDefault();
  };
  if (user) {
    const email = user.email;
    handleCustomer(email);
    return (
      <ThemeProvider theme={NewthemeDark}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PersonOutline />
            </Avatar>
            <Typography component="h1" variant="h5">
              Welcome to LeechersParadise:
            </Typography>
            <TextField
              value={user?.email}
              margin="normal"
              fullWidth
              id="user"
              label=""
              name="user"
              autoComplete="nope"
              disabled
            />
          </Box>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <form
              action="https://api.leechersparadise.com/create-portal-session"
              method="POST"
            >
              <input
                type="hidden"
                id="customer"
                name="customer"
                value={customer}
              />
              <Button
                id="checkout-and-portal-button"
                variant="contained"
                type="submit"
              >
                View Subscription
              </Button>
            </form>
          </Box>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link to="/changeemail">
              <Button variant="contained">Change Email</Button>
            </Link>
          </Box>
        </Container>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={NewthemeDark}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  id="user"
                  label="Email"
                  name="user"
                  autoComplete="nope"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
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
                  title="Incorrect Credentials"
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </Tooltip>
                <Grid container>
                  <Grid item xs style={{ textAlign: "center" }}>
                    <Link to="/forgot" style={{ color: "white" }}>
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </ClickAwayListener>
          <Copyright sx={{ mt: 20, mb: 4 }} />
        </Container>
      </ThemeProvider>
    );
  }
}
