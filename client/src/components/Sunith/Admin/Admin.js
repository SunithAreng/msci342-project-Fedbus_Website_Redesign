import React from 'react';
import history from '../../Navigation/history';
import { createTheme, ThemeProvider, styled, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box, Button, TextField, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Selection } from '../SearchSchedule/Selection';
import { Stations } from '../SearchSchedule/Stations';
import { Timings } from '../SearchSchedule/Timings';
import { DateSelection } from '../SearchSchedule/DateSelection';
import { RouteAPI } from './RouteAPI';
import { useSelector } from 'react-redux';
import { AnnoucementAPI } from '../Annoucements/AnnoucementAPI'

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Admin = (props) => {
    const adminConfirm = props.location.state.stuff[0];
    const serverURL = useSelector((state) => state.serverURL.value);

    const classes = useStyles();

    const [destinationName, setDestinationName] = React.useState('');
    const [destinationStopID, setDestinationStopID] = React.useState(0);
    const [originName, setOrigin] = React.useState('');
    const [originStopID, setOriginStopID] = React.useState(0);
    const [fedbus, setFedbus] = React.useState(0);
    const [price, setPrice] = React.useState("");
    const [priceErr, setPriceErr] = React.useState(false);
    const [seats, setSeats] = React.useState("");
    const [seatsErr, setSeatsErr] = React.useState(false);
    const [newStation, setNewStation] = React.useState('');
    const [route, setRoute] = React.useState('');
    const [routeID, setRouteID] = React.useState('');
    const [routeErr, setRouteErr] = React.useState(false);

    const handleRouteSelection = (selectedRoute) => {
        // console.log(selectedRoute);
        setRoute(selectedRoute.route);
        setRouteID(selectedRoute.id);
        setESeat(selectedRoute.seatsCap);
        setRouteErr(false);
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
        setPriceErr(false);
    }

    const handleSeatsChange = (event) => {
        setSeats(event.target.value);
        setSeatsErr(false);
    }

    const [desErr, setDesErr] = React.useState(false);

    const handleDestinationChange = (selectedStop) => {
        setDestinationName(selectedStop.station_name);
        setDestinationStopID(selectedStop.id);
        setDesErr(false);
    };

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const [ogErr, setOgErr] = React.useState(false);

    const handleOriginChange = (selectedStop) => {
        setOrigin(selectedStop.station_name);
        setOriginStopID(selectedStop.id);
        setOgErr(false);
    };

    const [originTime, setOriginTime] = React.useState('');
    const [originTimeID, setOriginTimeID] = React.useState('');

    const [destinationTime, setDestinationTime] = React.useState('');
    const [destinationTimeID, setDestinationTimeID] = React.useState('');

    const [eSeat, setESeat] = React.useState();
    const [ogTimeErr, setOgTimeErr] = React.useState(false);

    const handleOgTimeChange = (selectedTime) => {
        setOriginTime(selectedTime.time);
        setOriginTimeID(selectedTime.id);
        setOgTimeErr(false);
    };

    const [desTimeErr, setDesTimeErr] = React.useState(false);
    const handleDesTimeChange = (selectedTime) => {
        setDestinationTime(selectedTime.time);
        setDestinationTimeID(selectedTime.id);
        setDesTimeErr(false);
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
            const url = serverURL + "/api/newSchedule";
            console.log(url);
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userSelectection)
            });
            setOpen(true);
        }
        routeID && originTimeID && destinationTimeID ? sendAPInewRoute(userSelectection) : emptyChk2();
    };

    const emptyChk2 = () => {
        if (routeID == '') {
            setRouteErr(true);
        } else if (originTimeID == '') {
            setOgTimeErr(true);
        } else if (destinationTimeID == '') {
            setDesTimeErr(true);
        };
    }

    const handleSubmitNewRoute = () => {
        const userSelectection = {
            origin: originStopID,
            destination: destinationStopID,
            price: price,
            seat: seats,
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
            setOpen(true);
        };
        originStopID && destinationStopID && price && seats ? sendAPInewRoute(userSelectection) : emptyChk1();
    }

    const emptyChk1 = () => {
        if (originStopID == 0) {
            setOgErr(true);
        } else if (destinationStopID == 0) {
            setDesErr(true);
        } else if (price == "") {
            setPriceErr(true);
        } else if (seats == "") {
            setSeatsErr(true);
        }
    }

    const handleNewStation = (event) => {
        setNewStation(event.target.value);
        setNewStationErr(false);
    }

    const [newStationErr, setNewStationErr] = React.useState(false);

    const handleSubmitNewStation = () => {
        const userSelectection = {
            name: newStation,
        }
        // console.log(userSelectection);
        const sendAPInewRoute = async (userSelectection) => {
            const url = serverURL + "/api/newStation";
            console.log(url);
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userSelectection)
            });
            setOpen(true);
        };
        newStation ? sendAPInewRoute(userSelectection) : setNewStationErr(true);
    }

    const [annoucementsTitle, setAnnoucementTitle] = React.useState('');
    const [annoucementsTitleErr, setAnnoucementTitleErr] = React.useState(false);

    const handleAnnoucementTitle = (event) => {
        setAnnoucementTitle(event.target.value);
        setAnnoucementTitleErr(false);
    }

    const [annoucementsContent, setAnnoucementContent] = React.useState('');
    const [annoucementsContentErr, setAnnoucementContentErr] = React.useState(false);

    const handleAnnoucementContent = (event) => {
        setAnnoucementContent(event.target.value);
        setAnnoucementContentErr(false);
    }

    const handleSubmitNewAnnoucement = () => {
        const userSelectection = {
            title: annoucementsTitle,
            content: annoucementsContent
        }
        console.log(userSelectection);
        const sendAPInewAnnoucement = async (userSelectection) => {
            const url = serverURL + "/api/newAnnoucement";
            console.log(url);
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userSelectection)
            });
            setOpen(true);
        };
        annoucementsTitle ? sendAPInewAnnoucement(userSelectection) : setAnnoucementTitleErr(true);
    }

    const [selectedAnnouce, setSelectedAnnouce] = React.useState('');
    const [selectedAnnouceErr, setSelectedAnnouceErr] = React.useState(false);
    const [selectedAnnouceID, setSelectedAnnouceID] = React.useState(0);

    const handleAnnouce = (selection) => {
        setSelectedAnnouce(selection.title);
        setSelectedAnnouceID(selection.id);
        setSelectedAnnouceErr(false);
    }

    const handleDeleteAnnoucement = () => {
        const userSelectection = {
            id: selectedAnnouceID,
        }
        console.log(userSelectection);
        const sendAPIdeleteAnnoucement = async (userSelectection) => {
            const url = serverURL + "/api/deleteAnnoucement";
            console.log(url);
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userSelectection)
            });
            setOpen(true);
        };
        selectedAnnouceID ? sendAPIdeleteAnnoucement(userSelectection) : setSelectedAnnouceErr(true);
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
                  <Button
  key='9'
  onClick={() => history.push('/MyProfile')}
  type="submit"
  halfWidth
  variant="contained"
  color="secondary"
  style={{ position: 'absolute', top: 30, left: 130 }}
>
  Go back
</Button>
                {/* <Button key='4'
                    onClick={() => history.push('/MyProfile')}
                    variant="contained" color="primary"
                    sx={{ my: 2, display: 'block' }}>Go Back</Button> */}
                    <p></p>
                    <p></p>
                <Typography variant="h2" align="center"> This is the Admin page.</Typography>
                <Typography><center>*Please make sure to refresh the page to see your changes!</center></Typography>
                <p></p>
                <br/>
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
                        errorState={routeErr}
                    />
                    <Selection
                        handleChange={handleOgTimeChange}
                        classes={classes}
                        elementName={originTime}
                        label={"Departure time?"}
                        idlabel={"times-list"}
                        objectList={Timings()}
                        errorState={ogTimeErr}
                    />
                    <Selection
                        handleChange={handleDesTimeChange}
                        classes={classes}
                        elementName={destinationTime}
                        label={"Arrival time?"}
                        idlabel={"times-list"}
                        objectList={Timings()}
                        errorState={desTimeErr}
                    />
                    <br />
                    <DateSelection
                        onChange={setDate}
                        date={date}
                    />
                    <Typography>Please make sure that you pick the right date!</Typography>
                    <br />
                    <Button variant="contained" color="secondary" onClick={handleSubmitNewSchedule}>Submit</Button>
                </Grid>
                <br />
                <Grid
                    container
                    direction="column"
                    justifyContent='center'
                    alignItems='center'
                    spacing={2}
                >
                    <Grid direction="column"
                        item xs={30}>
                        <Typography variant="h4" component="h4">Add New Station</Typography>
                        <br />
                        <TextInput
                            label={"Station Name"}
                            valueState={newStation}
                            onEntry={handleNewStation}
                            errState={newStationErr}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={handleSubmitNewStation}>Submit</Button>
                    </Grid>
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
                        errorState={ogErr}
                    />
                    <Selection
                        handleChange={handleDestinationChange}
                        classes={classes}
                        elementName={destinationName}
                        label={"Destination"}
                        idlabel={"destination-list"}
                        objectList={Stations()}
                        errorState={desErr}
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
                    justifyContent='center'
                    alignItems='center'
                    spacing={2}
                >
                    <Grid
                        item
                        xs={30}>
                        <Typography variant="h4" component="h4">Add New Annoucements</Typography>
                        <br />
                        <TextInput
                            label={"Annoucement Title"}
                            valueState={annoucementsTitle}
                            onEntry={handleAnnoucementTitle}
                            errState={annoucementsTitleErr}
                        />
                        <br /> <br />
                        <TextField
                            id="Annon Body"
                            label="Annoucement Content"
                            multiline
                            fullWidth
                            minRows={4}
                            value={annoucementsContent}
                            onChange={handleAnnoucementContent}
                            variant="outlined"
                            inputProps={{ maxLength: 200 }}
                            helperText={annoucementsContentErr ? "" : "Maximum 200 characters"}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={handleSubmitNewAnnoucement}>Submit</Button>
                    </Grid>
                </Grid>
                <br />
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h4" component="h4">Delete Old Annoucements</Typography>
                    <Typography>Routinely Check for old annoucements and delete accordingly!</Typography>
                    <Selection
                        handleChange={handleAnnouce}
                        classes={classes}
                        elementName={selectedAnnouce}
                        label={"Annoucements"}
                        idlabel={"Annoucement-list"}
                        objectList={AnnoucementAPI()}
                        errorState={selectedAnnouceErr}
                    />
                    <br />
                    <Button variant="contained" color="secondary" onClick={handleDeleteAnnoucement}>Submit</Button>
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Your changes have been saved!
                    </Alert>
                </Snackbar>
                <br /><br />
            </Box>
        </ThemeProvider >
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
                helperText={errState ? "Please fill in the missing data" : ""}
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
                fullWidth
                helperText={errState ? "Please fill in the missing data" : ""}
            />
        </>
    )
}

export default Admin;
