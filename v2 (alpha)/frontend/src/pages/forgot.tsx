import { createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { sendPasswordResetEmail } from "firebase/auth";
import { fireAuth } from '../config/firebase.config';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
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
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Forgot() {
    const [open, setOpen] = React.useState(false);
    const [dopen, setdOpen] = React.useState(false);
    const handleTooltipClose = () => {
        setOpen(false);
    };
    const handledClose = () => {
        setdOpen(false);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string
        sendPasswordResetEmail(fireAuth, email)
        .then(() => {
          form.reset();
          setdOpen(true);
          })
        .catch(error => {
      setOpen(true);
    })
    }
    return (
      <ThemeProvider theme={NewthemeDark}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
          <Box display="flex" justifyContent="center" minHeight="100vh" style={{textAlign: "center"}}>
          <div>
          <div style={{textAlign: "center"}}>
          <h1>Forgot Password</h1>
          </div>
          <p>Here you can receive your password again. Please enter your email that you use to login, to get your password reset.</p>
          <ClickAwayListener onClickAway={handleTooltipClose}>
          <Box component="form" onSubmit={handleSubmit}>
          <TextField label="Email" variant="outlined" name="email" autoComplete="nope"
              autoFocus fullWidth style={{ marginBottom: "20px", marginTop: "30px"}}/>
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
          <Button type="submit" variant='contained'>Submit</Button>
          </Tooltip>
          <Dialog
        open={dopen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handledClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Password reset sent! 📬"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please check your email for the reset link.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" fullWidth onClick={handledClose}>Close</Button>
        </DialogActions>
      </Dialog>
          </Box>
          </ClickAwayListener>
          </div>
          </Box>
        </Container>
      </ThemeProvider>
    )
}