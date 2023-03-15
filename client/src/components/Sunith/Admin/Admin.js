import React from 'react';
import history from '../../Navigation/history';
import { createTheme, ThemeProvider, styled, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box, Button } from '@material-ui/core';
import { Selection } from '../SearchSchedule/Selection';
import { Stations } from '../SearchSchedule/Stations';
import { Timings } from '../SearchSchedule/Timings';
import { DateSelection } from '../SearchSchedule/DateSelection';

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

    const classes = useStyles();

    const [destinationName, setDestinationName] = React.useState("");
    const [destinationStopID, setDestinationStopID] = React.useState(0);
    const [originName, setOrigin] = React.useState("");
    const [originStopID, setOriginStopID] = React.useState(0);

    const handleDestinationChange = (selectedStop) => {
        setDestinationName(selectedStop.station_name);
        setDestinationStopID(selectedStop.id);
    };

    const handleOriginChange = (selectedStop) => {
        setOrigin(selectedStop.station_name);
        setOriginStopID(selectedStop.id);
    };

    const [time, setTime] = React.useState();
    const [timeID, setTimeID] = React.useState();

    const handleTimeChange = (selectedTime) => {
        setTime(selectedTime.time);
        setTimeID(selectedTime.id);
    };

    const [date, setDate] = React.useState(new Date());


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
                    <Typography variant="h4" component="h4">Add Schedule to the Existing Routes</Typography>
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
                    <Selection
                        handleChange={handleTimeChange}
                        classes={classes}
                        elementName={time}
                        label={"Departure time?"}
                        idlabel={"times-list"}
                        objectList={Timings()}
                    />
                    <Selection
                        handleChange={handleTimeChange}
                        classes={classes}
                        elementName={time}
                        label={"Arrival time?"}
                        idlabel={"times-list"}
                        objectList={Timings()}
                    />
                    <br />
                    <DateSelection
                        onChange={setDate}
                        date={date}
                    />
                    <Button variant="contained" color="secondary">Submit</Button>
                </Grid>
                <br />
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                </Grid>

            </Box>
        </ThemeProvider>
    );
}

export default Admin;
