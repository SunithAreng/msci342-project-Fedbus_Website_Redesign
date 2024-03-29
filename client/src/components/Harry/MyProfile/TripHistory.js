import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles";
import { FedbusTC } from '../../FedbusTC';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
            display: "none"
        }
    }
}));

export const TripHistory = (props) => {
    const classes = useStyles();
    let [finalTrip, setFinalTrip] = React.useState([])
    let [final, setFinal] = React.useState(false)
    let tripsArray1 = []
    const [tripsArray, setTripsArray] = React.useState([]);
    let [error, setError] = React.useState("")
    let [showHistory, setShowHistory] = React.useState(false)
    let pastTrips = []
    if (props.pastTrips) {
        pastTrips = props.pastTrips.split(" ")
    }
    let serverURL = props.serverUrl
    let finalPastTrips = [...new Set(pastTrips)]
    let getPastTrips = (pastTrip) => {
        callGetPastTrips(pastTrip).then((res) => {
            let parsed = JSON.parse(res.express)
            tripsArray1 = [...tripsArray1, parsed[0]]
            setTripsArray(tripsArray1);
            // console.log(tripsArray1);
        }).catch((err) => {
            console.log(err)
        })
    }
    let getTrips = (trip) => {
        callGetPastTrips(trip).then((res) => {
            let parsed = JSON.parse(res.express)
            finalTrip = [...finalTrip, parsed[0]]
            setFinalTrip(finalTrip)
            console.log(finalTrip)
        }).catch((err) => {
            console.log(err)
        })
    }

    const callGetPastTrips = async (pastTrip) => {
        const url = serverURL + "/api/getPastTrips";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                pastTrips: pastTrip,
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("User settings: ", body);
        return body;
    }

    const handleSubmit = () => {
        setShowHistory(!showHistory)
        if (pastTrips.length !== 0) {
            finalPastTrips.forEach((val) => {
                console.log(val)
                getPastTrips(val);
            })
        } else {
            setError("No past trips to show")
        }
    }
    const handlePurchase = () => {
        let newTrip = parseInt(selectionModel[0]) + 14;
        setFinal(true)
        getTrips(newTrip)
        handleClickOpen();
    }
    const columns = [
        { field: 'trip_id', headerName: 'Trip ID', width: 150 },
        { field: 'origin', headerName: 'Origin', width: 250 },
        { field: 'destination', headerName: 'Destination', width: 250 },
        { field: 'trip_date', headerName: 'Trip Date', type: 'date', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },
    ]
    const [selectionModel, setSelectionModel] = React.useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {!showHistory && <Button onClick={(() => handleSubmit())}>Click to display trip history</Button>}
            {showHistory && <Button onClick={(() => handleSubmit())}>Click to hide trip history</Button>}
            {(selectionModel.length > 0) && <Button onClick={(() => handlePurchase())}>Click to re-book same trip this week</Button>}
            {final && (<Link to={{
                pathname: '/Payment', state: {
                    stuff: finalTrip,
                    page: 2
                }
            }} style={{ textDecoration: 'none', marginLeft: '10px' }}>
                <FedbusTC
                    open={open}
                    handleClose={handleClose} />
            </Link>)}
            {showHistory &&
                <>
                    <Typography>{error}</Typography>
                    <div style={{ height: 400, width: '150%' }}>
                        <DataGrid
                            className={classes.root}
                            onSelectionModelChange={(selection) => {
                                const newSelectionModel = [...selection];
                                if (newSelectionModel.length > 1) {
                                    const selectionSet = new Set(selectionModel);
                                    const result = newSelectionModel.filter(
                                        (s) => !selectionSet.has(s)
                                    );
                                    setSelectionModel(result);
                                } else {
                                    setSelectionModel(newSelectionModel);
                                }
                            }}
                            checkboxSelection={true}
                            selectionModel={selectionModel}
                            rows={tripsArray}
                            columns={columns}
                            getRowId={(results) => results.trip_id}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            rowHeight={50}
                        />
                    </div>
                </>
            }
        </div>
    )
}