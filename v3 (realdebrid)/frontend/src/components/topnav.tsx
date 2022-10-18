import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Link } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuthUser } from '../hooks/AuthUser';
import { signOut } from 'firebase/auth';
import { fireAuth } from '../config/firebase.config';
import { Logout } from '@mui/icons-material';
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

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const user = useAuthUser()
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const logout = () => {
    signOut(fireAuth)
  }
  return (
    <>
    <ThemeProvider theme={NewthemeDark}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <Button 
          color="inherit"
          >
            <Link to="/login" style={{ textDecoration: 'none', color: "white"}}>{user ?  user?.email : 'User Panel'}</Link></Button>
          {user &&
          <Button
              color="error"
              onClick={logout}
              title="Logout"
          >
            <Logout /></Button>}
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
    <div>
    <Menu
      id="fade-menu"
      MenuListProps={{
        'aria-labelledby': 'fade-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      <MenuItem onClick={handleClose}><Link to="/" style={{ textDecoration: 'none', color: "black"}}>Download</Link></MenuItem>
      <MenuItem onClick={handleClose}><Link to="/torrent" style={{ textDecoration: 'none', color: "black"}}>Torrent</Link></MenuItem>
      <MenuItem onClick={handleClose}><Link to="/about" style={{ textDecoration: 'none', color: "black"}}>About</Link></MenuItem>
      <MenuItem onClick={handleClose}><Link to="/login" style={{ textDecoration: 'none', color: "black"}}>User Panel</Link></MenuItem>
      <MenuItem onClick={handleClose}><a href='https://status.leechersparadise.com' style={{ textDecoration: 'none', color: "black"}}>Website Status</a></MenuItem>
      <MenuItem onClick={handleClose}><Link to="/donate" style={{ textDecoration: 'none', color: "#50c878"}}>Donate</Link></MenuItem>
      <MenuItem onClick={handleClose}><Link to="/getpremium" style={{ textDecoration: 'none', color: "#d4af37"}}>Premium</Link></MenuItem>
      
    </Menu>
  </div>
  </>
  );
}
