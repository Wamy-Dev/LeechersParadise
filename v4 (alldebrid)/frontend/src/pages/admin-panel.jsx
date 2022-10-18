import {
    Alert,
    Card,
    CardContent,
    CardHeader,
    TextField
} from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home'
import {useState, useEffect} from "react";
import Snackbar from '@mui/material/Snackbar';
import { createMuiTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {saveAdminPanel, getAdminPanel} from "../apis/admin-panel.api";
export default function AdminPanel() {
    const [formState, setFormState] = useState({dollarvalue: '', dollargoal: ''});
    const [alert, setAlert] = useState({message: '', severity: ''});
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    async function save(event) {
        event.preventDefault()
        try {
            const result = await saveAdminPanel(formState)
            if (result.status !== 200) throw 'Error'
            setAlert({message: 'Success! Added values to the donation bar.', severity: 'success'});
            setOpen(true)
        } catch(ex) {
            setAlert({message: 'Failure! Something went wrong.', severity:'error'});
            setOpen(true)
        }
    }
    useEffect(async () => {
        const response = await getAdminPanel();
        const result = await response.json()
        setFormState({dollargoal: result.dollarGoal, dollarvalue: result.dollarValue})
    },[])
    const NewthemeDark = createMuiTheme({
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
    return (
        <ThemeProvider theme={NewthemeDark}>
        <Container component="main">
        <CssBaseline />
        <Container>
            <Box  display="flex" justifyContent="center">
                <Link to="/" style={{color: "#50c878", paddingTop: "10px"}}>  <HomeIcon /></Link>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Card>
                    <CardHeader title="Admin Panel"></CardHeader>
                    <CardContent>
                        <form onSubmit={save}>
                            <Grid container justifyContent="space-around">
                                {/*Donation value*/}
                                <TextField onChange={(ev) => setFormState({...formState, dollarvalue: ev.target.value})}
                                    type="number" 
                                    value={formState.dollarvalue} 
                                    id="donation-value" 
                                    label="Donation Value" 
                                    variant="outlined" 
                                    sx={{mr:1}}
                                />
                                {/*Donation goal*/}          
                                <TextField onChange={(ev) => setFormState({...formState, dollargoal: ev.target.value})}
                                    type="number" 
                                    value={formState.dollargoal} 
                                    id="donation-goal" 
                                    label="Donation Goal" 
                                    variant="outlined" 
                                    sx={{mr:1}}
                                />
                                {/*API key*/}
                                <TextField onChange={(ev) => setFormState({...formState, apiKey: ev.target.value})}
                                    type="text" 
                                    value={formState.apiKey} 
                                    id="api-key" label="Apikey" 
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid container sx={{mt:2}} justifyContent="flex-end">
                                <Button 
                                    type="submit" 
                                    size="small" 
                                    variant="outlined" 
                                    color="success" 
                                >Save changes</Button>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Box>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert severity={alert.severity} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Container>
        <CssBaseline />
        </Container>
      </ThemeProvider>
    )
}