import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import history from '../../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import { ResultsTable } from './ResultsTable';
import { DateSelection } from './DateSelection';
import { Selection } from './Selection';
import { Preference } from './Preference';
import { Stations } from './Stations';
import { Timings } from './Timings';

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
    const [destinationStopID, setDestinationStopID] = React.useState(0);

    const handleDestinationChange = (selectedStop) => {
        setDestinationName(selectedStop.station_name);
        setDestinationStopID(selectedStop.id);
    };

    const [originName, setOrigin] = React.useState("");
    const [originStopID, setOriginStopID] = React.useState(0);

    const handleOriginChange = (selectedStop) => {
        setOrigin(selectedStop.station_name);
        setOriginStopID(selectedStop.id);
    };

    const [value, setValue] = React.useState('1');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const [tripPref, setTripPref] = React.useState('1');

    const handlePrefChange = (event) => {
        setTripPref(event.target.value);
    };

    var today = new Date(),
        t = (today.getHours() + 1).toString().padStart(2, '0') + ':00:00',
        x = (today.getHours() + 1) * 4;

    const [time, setTime] = React.useState(t);
    const [timeID, setTimeID] = React.useState(x);

    const handleTimeChange = (selectedTime) => {
        setTime(selectedTime.time);
        setTimeID(selectedTime.id);
    };

    const [date, setDate] = React.useState(new Date());
    const [results, setResults] = React.useState([]);

    const handleClickSearch = () => {
        var dd = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        const userSelectection = {
            origin: originStopID,
            destination: destinationStopID,
            preference: value,
            time: timeID,
            date: dd,
        }
        // console.log(userSelectection);
        handleSearch(userSelectection);
    }

    const handleSearch = (userSelectection) => {
        const callApiSearch = async (userSelectection) => {
            const url = serverURL + "/api/search";
            console.log(url);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userSelectection)
            });
            const body = await response.json();
            if (response.status !== 200) throw Error(body.message);
            return body;
        }

        callApiSearch(userSelectection)
            .then(
                res => {
                    var parsed = JSON.parse(res.express);
                    setResults(parsed);
                }
            )
    }
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [sendFinal, setSendFinal] = React.useState([])
    const [showConfirmLink, setShowConfirmLink] = React.useState(false)
    const [showErrorMessage, setShowErrorMessage] = React.useState()
    const payment = () => {
        var buy = [...results]
        var send = []
        buy.filter(x => {
            if (x.trip_id == selectionModel) {
                send.push(x)
            }
        })
        console.log(send);
        setSendFinal(send);
        if (send.length > 0) {
            setShowConfirmLink(true)
        } else {
            setShowConfirmLink(false)
            setShowErrorMessage('Please select at least 1 trip')
        }
        // return(<Redirect to = {{pathname : '/Payment', state : {send}}} />)

    }
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
                                key='1'
                                onClick={() => history.push('/')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Home
                            </Button>
                            <Button
                                key='2'
                                onClick={() => history.push('/SearchSchedule')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Schedule
                            </Button>
                            <Button
                                key='3'
                                onClick={() => history.push('/SignIn')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Sign In
                            </Button>
                            <Button
                                key='9'
                                onClick={() => history.push('/SignUp')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Sign Up
                            </Button>
                            <Button
                                key='4'
                                onClick={() => history.push('/MyProfile')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                MyProfile
                            </Button>
                            <Button
                                key='7'
                                onClick={() => history.push('/FAQ')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                FAQ
                            </Button>
                            <Button
                                key='8'
                                onClick={() => history.push('/Location')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Location
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
                        <Selection
                            handleChange={handleOriginChange}
                            classes={classes}
                            elementName={originName}
                            label={"Origin"}
                            idlabel={"origin-list"}
                            objectList={Stations()}
                        />
                        <Selection
                            handleChange={handleDestinationChange}
                            classes={classes}
                            elementName={destinationName}
                            label={"Destination"}
                            idlabel={"destination-list"}
                            objectList={Stations()}
                        />
                        <Preference
                            classes={classes}
                            spacing={value}
                            handleChange={handleChange}
                            object={[{ id: '1', name: "Depart at" }, { id: '2', name: "Arrive by" }]}
                        />
                        <Selection
                            handleChange={handleTimeChange}
                            classes={classes}
                            elementName={time}
                            label={"What time?"}
                            idlabel={"times-list"}
                            objectList={Timings()}
                        />
                        <br />
                    </Grid>
                    <br />
                    <Grid container>
                        <DateSelection
                            onChange={setDate}
                            date={date}
                        />
                        <Preference
                            classes={classes}
                            spacing={tripPref}
                            handleChange={handlePrefChange}
                            object={[{ id: '1', name: "One way" }, { id: '2', name: "Round Trip" }]}
                        />
                    </Grid>
                    <br />
                    <div>
                        <Button variant="contained" color="secondary" onClick={handleClickSearch} style={{ marginRight: '10px' }}>
                            Search
                        </Button>
                    </div>
                </MainGridContainer>
                <div style={{ marginLeft: '33px' }}>
                    <Button variant="contained" color="secondary" onClick={payment} >
                        Proceed to payment
                    </Button>
                    {
                        showConfirmLink ?
                            (<Link to={{
                                pathname: '/Payment', state: {
                                    stuff: sendFinal
                                }
                            }} style={{ textDecoration: 'none', marginLeft: '10px' }}>
                                <Button variant="contained" color="secondary">
                                    Click to confirm your selection
                                </Button>
                            </Link>) : <Typography variant="h6" color="secondary">{showErrorMessage}</Typography>
                    }
                </div>
                <br />
                <ResultsTable
                    results={results}
                    setSelectionModel={setSelectionModel}
                    selectionModel={selectionModel}
                />
            </Box>
        </ThemeProvider>
    );
}

export default SearchSchdeule;