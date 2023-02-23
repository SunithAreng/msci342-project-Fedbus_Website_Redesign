import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import { Dialog, MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import history from '../../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';

// const serverURL = ""; //enable for dev mode

const serverURL = "http://localhost:8081";

const opacityValue = 0.9;

const lightTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: "#ffffff"
        },
        primary: {
            main: '#ef9a9a',
            light: '#ffcccb',
            dark: '#ba6b6c',
            background: '#eeeeee'
        },
        secondary: {
            main: "#b71c1c",
            light: '#f05545',
            dark: '#7f0000'
        },
    },
});

const MainGridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(4),
}))

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minWidth: 275,
        "& > *": {
            margin: theme.spacing(1),
            width: 500,
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 500,
        },
    },
    paper: {
        height: 140,
        width: 500,
    },
    control: {
        padding: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 500,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 400,
    },
    pos: {
        marginBottom: 100,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const SearchSchdeule = () => {

    const classes = useStyles();
    const [destinationName, setDestinationName] = React.useState("");
    const [originName, setOrigin] = React.useState("");
    const [stations, setStations] = React.useState([]);
    const [originStopID, setOriginStopID] = React.useState(0);
    const [destinationStopID, setDestinationStopID] = React.useState(0);

    React.useEffect(() => {
        getOrigin();
    }, []);

    const getOrigin = () => {
        callApiGetOrigin()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setStations(parsed);
                // console.log(parsed);
            })
    }

    const callApiGetOrigin = async () => {
        const url = serverURL + "/api/getOrigin";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const handleDestinationChange = (selectedStop) => {
        setDestinationName(selectedStop.station_name);
        setDestinationStopID(selectedStop.id);
        setErrState4(false);
    };


    const handleOriginChange = (selectedStop) => {
        setOrigin(selectedStop.station_name);
        setOriginStopID(selectedStop.id);
        setErrState4(false);
    };

    const [errState4, setErrState4] = React.useState(false);

    return (
        <ThemeProvider theme={lightTheme}>
            <Box
                sx={{
                    height: '100vh',
                    opacity: opacityValue,
                    overflow: 'scroll',
                    // backgroundImage: `url(https://images.unsplash.com/photo-1638722712332-731b0e338e18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)`,
                    backgroundSize: "cover"
                }}
            >
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Button
                                key='3'
                                onClick={() => history.push('/')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Home
                            </Button>
                            <Button
                                key='3'
                                onClick={() => history.push('/FAQ')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                FAQ
                            </Button>
                            <Button
                                key='1'
                                onClick={() => history.push('/MyProfile')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                MyProfile
                            </Button>
                            <Button
                                key='2'
                                onClick={() => history.push('/Payment')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Payment
                            </Button>
                        </Toolbar>
                    </Container>
                </AppBar>
                <MainGridContainer
                    container
                    spacing={5}
                    style={{ maxWidth: '50%' }}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                    overflow="scroll"
                >
                    <Typography variant="h3" component="div">
                        Get Schedule
                    </Typography>
                    <Grid container>
                        <StopSelection
                            handleChange={handleOriginChange}
                            classes={classes}
                            stopName={originName}
                            label={"Origin"}
                            idlabel={"origin-list"}
                            errState={errState4}
                            stations={stations}
                        />
                        <StopSelection
                            handleChange={handleDestinationChange}
                            classes={classes}
                            stopName={destinationName}
                            label={"Destination"}
                            idlabel={"destination-list"}
                            errState={errState4}
                            stations={stations}
                        />
                    </Grid>
                    <br />
                </MainGridContainer>
            </Box>
        </ThemeProvider>
    );
}


const StopSelection = ({ stations, handleChange, classes, stopName, label, idlabel, errState }) => {
    return (
        <>
            <FormControl variant='outlined' className={classes.formControl} error={errState}>
                <InputLabel id={idlabel}>{label}</InputLabel>
                <Select
                    required
                    labelId={idlabel}
                    id={idlabel}
                    value={stopName}
                >
                    {stations.map((stop) => {
                        return (
                            <MenuItem key={stop.id} value={stop.station_name} onClick={() => handleChange(stop)}>
                                {stop.station_name}
                            </MenuItem>
                        )
                    }
                    )}
                </Select>
                <FormHelperText>{errState ? "Please select a stop" : ""}</FormHelperText>
            </FormControl>
        </>
    )
}

export default SearchSchdeule;