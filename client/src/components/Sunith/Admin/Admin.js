import React from 'react';
import history from '../../Navigation/history';
import { createTheme, ThemeProvider, styled, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box, Button, TextField } from '@material-ui/core';
import { Selection } from '../SearchSchedule/Selection';
import { Stations } from '../SearchSchedule/Stations';
import { Timings } from '../SearchSchedule/Timings';
import { DateSelection } from '../SearchSchedule/DateSelection';
import { RouteAPI } from './RouteAPI';
import { useSelector } from 'react-redux';

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


const Admin = (props) => {
    const adminConfirm = props.location.state.stuff[0];
    const serverURL = useSelector((state) => state.serverURL.value);

    const classes = useStyles();

    const [destinationName, setDestinationName] = React.useState("");
    const [destinationStopID, setDestinationStopID] = React.useState(0);
    const [originName, setOrigin] = React.useState("");
    const [originStopID, setOriginStopID] = React.useState(0);
    const [fedbus, setFebbus] = React.useState(0);
    const [price, setPrice] = React.useState();
    const [priceErr, setPriceErr] = React.useState(false);
    const [seats, setSeats] = React.useState();
    const [seatsErr, setSeatsErr] = React.useState(false);
    const [newStation, setNewStation] = React.useState('');
    const [route, setRoute] = React.useState('');
    const [routeID, setRouteID] = React.useState('');

    const handleRouteSelection = (selectedRoute) => {
        // console.log(selectedRoute);
        setRoute(selectedRoute.route);
        setRouteID(selectedRoute.id);
        setESeat(selectedRoute.seatsCap);
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
        setPriceErr(false);
    }

    const handleSeatsChange = (event) => {
        setSeats(event.target.value);
        setSeatsErr(false);
    }

    const handleDestinationChange = (selectedStop) => {
        setDestinationName(selectedStop.station_name);
        setDestinationStopID(selectedStop.id);
    };

    const handleOriginChange = (selectedStop) => {
        setOrigin(selectedStop.station_name);
        setOriginStopID(selectedStop.id);
    };

    const [originTime, setOriginTime] = React.useState();
    const [originTimeID, setOriginTimeID] = React.useState();

    const [destinationTime, setDestinationTime] = React.useState();
    const [destinationTimeID, setDestinationTimeID] = React.useState();

    const [eSeat, setESeat] = React.useState();

    const handleOgTimeChange = (selectedTime) => {
        setOriginTime(selectedTime.time);
        setOriginTimeID(selectedTime.id);
    };

    const handleDesTimeChange = (selectedTime) => {
        setDestinationTime(selectedTime.time);
        setDestinationTimeID(selectedTime.id);
    };

    const [date, setDate] = React.useState(new Date());

    const handleSubmitNewSchedule = () => {
        var dd = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        const userSelectection = {
            routeID: routeID,
            origin: originTimeID,
            destination: destinationTimeID,
            seats: eSeat,
            date: dd,
        }
        console.log(userSelectection);
        const sendAPInewRoute = async (userSelectection) => {
            const url = serverURL + "/api/newRoute";
            console.log(url);
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userSelectection)
            });
        }
        sendAPInewRoute(userSelectection);
    }

    const handleSubmitNewRoute = () => {
        const userSelectection = {
            origin: originStopID,
            destination: destinationStopID,
            price: price,
            seat: seats,
        }
        // console.log(userSelectection);
        const sendAPInewRoute = async (userSelectection) => {
            const url = serverURL + "/api/newRoute";
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
        sendAPInewRoute(userSelectection);
    }


    return (
        <ThemeProvider theme={lightTheme}>
            <Box
                sx={{
                    height: '100vh',
                    opacity: 0.9,
                    overflow: 'scroll',
                    backgroundSize: "cover"
                }}
            >
                <Button key='4'
                    onClick={() => history.push('/MyProfile')}
                    variant="contained" color="primary"
                    sx={{ my: 2, display: 'block' }}>Go Back</Button>
                <h1> Welcome to the Admin page.</h1>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h4" component="h4">Add New Schedule</Typography>
                    <Selection
                        handleChange={handleRouteSelection}
                        classes={classes}
                        elementName={route}
                        label={"Route"}
                        idlabel={"route-list"}
                        objectList={RouteAPI()}
                    />
                    <Selection
                        handleChange={handleOgTimeChange}
                        classes={classes}
                        elementName={originTime}
                        label={"Departure time?"}
                        idlabel={"times-list"}
                        objectList={Timings()}
                    />
                    <Selection
                        handleChange={handleDesTimeChange}
                        classes={classes}
                        elementName={destinationTime}
                        label={"Arrival time?"}
                        idlabel={"times-list"}
                        objectList={Timings()}
                    />
                    <br />
                    <DateSelection
                        onChange={setDate}
                        date={date}
                    />
                    <br />
                    <Button variant="contained" color="secondary" onClick={handleSubmitNewSchedule}>Submit</Button>
                </Grid>
                <br />
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h4" component="h4">Add New Route</Typography>
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
                    <NumberInput
                        label={"Price Input"}
                        valueState={price}
                        onEntry={handlePriceChange}
                        errState={priceErr}
                    />
                    <br />
                    <NumberInput
                        label={"Seat Input"}
                        valueState={seats}
                        onEntry={handleSeatsChange}
                        errState={seatsErr}
                    />
                    <br />
                    <Button variant="contained" color="secondary" onClick={handleSubmitNewRoute}>Submit</Button>
                </Grid>
                <br />
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h4" component="h4">Add New Station</Typography>
                    <br />
                    <TextInput
                        label={"Station Name"}
                        valueState={seats}
                        onEntry={handleSeatsChange}
                        errState={seatsErr}
                    />
                    <br />
                    <Button variant="contained" color="secondary">Submit</Button>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

const NumberInput = ({ label, valueState, onEntry, errState }) => {
    return (
        <>
            <TextField
                required
                type='number'
                id={label}
                label={label}
                variant="outlined"
                onChange={onEntry}
                value={valueState}
                error={errState}
                helperText={errState ? "Please fill in the data" : ""}
            />
        </>
    )
}

const TextInput = ({ label, valueState, onEntry, errState }) => {
    return (
        <>
            <TextField
                required
                type='text'
                id={label}
                label={label}
                variant="outlined"
                onChange={onEntry}
                value={valueState}
                error={errState}
                helperText={errState ? "Please fill in the data" : ""}
            />
        </>
    )
}

export default Admin;
