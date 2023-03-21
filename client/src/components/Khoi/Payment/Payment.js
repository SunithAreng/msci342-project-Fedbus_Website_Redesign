import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import history from '../../Navigation/history';
import { AppBar, Toolbar, Typography, Button, IconButton, Link, Grid, Paper, Box, MenuItem, Select, FormControl, InputLabel, Divider, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Payment = (props) => {
  const serverURL = useSelector((state) => state.serverURL.value);
  const tripInfo = props.location.state.stuff[0]
  console.log(tripInfo)
  let [number, setNumber] = React.useState('')
  let [errorMessage, setErrorMessage] = React.useState('')
  let [successMessage, setSuccessMessage] = React.useState('')
  const regexNumber = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
  //tripInfo stuff
  let price = tripInfo.price;
  let tripId = tripInfo.trip_id;
  let seats = tripInfo.seats;
  let [pastTrips,setPastTrips] = React.useState(0)
  //localStorage
  let userUid = localStorage.getItem('userid');
  let token = localStorage.getItem('token');
  // let serverURL = localStorage.getItem('userURL')
  let [balance, setBalance] = React.useState()
  let [lackMoney, setLackMoney] = React.useState(false)
  let [showBackToMyProfile, setShowBackToMyProfile] = React.useState(false)
  let [paymentConfirmed,setPaymentConfirmed] = React.useState(false)
  // let [newPastTrips,setNewPastTrips] = React.useState(null)
  useEffect(() => {
    loadUserSettings()
  }, [])
  const loadUserSettings = () => {
    callApiLoadUserSettings()
      .then((res) => {
        let parsed = JSON.parse(res.express);
        setPastTrips(parsed[0].pastTrips)
        setBalance(parseInt(parsed[0].balance))
        if (balance < price){
          setLackMoney(true)
        }else{
          setLackMoney(false)
        }
      });
  }

  const callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserDetailsPayment";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userID: userUid,
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  const handleNumberChange = (e) => {
    setNumber(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (balance < price ){
      setErrorMessage("Your balance is not sufficient for this transaction. Please go back to MyProfile page to load money into your balance")
      setShowBackToMyProfile(true)
      return;
    }else{
      setShowBackToMyProfile(false)
    }
    if (!number) {
      setErrorMessage("Please fill out a credit card number")
      return;
    }
    if (!regexNumber.test(number)) {
      setErrorMessage("Please enter correct credit card number")
      return;
    }
    const updateSeats = () => {
      const url = serverURL + "/api/updateSeats";
      let newSeats = parseInt(seats) - 1;
      fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              // authorization: `Bearer ${this.state.token}`
          },
          body: JSON.stringify({
              trip_id: tripId,
              seats : newSeats,
          })
      }).then(() => {
          addToPastTrips()
      }).catch((error)=>{
          setErrorMessage(error)
          setSuccessMessage("")
      });
    }
    const addToPastTrips = () => {
      loadUserSettings()
        const url = serverURL + "/api/addToPastTrips";
        let newTrips = ""
        console.log("Seats number before add to " + pastTrips)
        if (pastTrips === null){
          newTrips = tripId
        }else{
          console.log("Seats number before add to " + pastTrips)
          // newTrips = tripId.toString()
          newTrips = pastTrips + " " + tripId.toString()
          console.log(newTrips)
        }
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                userID: userUid,
                pastTrips: newTrips,
            })
        }).then(() => {
            changeMoney()
        }).catch((error)=>{
            setErrorMessage(error)
            setSuccessMessage("")
        });
    }
    const changeMoney = () => {
        const url = serverURL + "/api/updateUserBalance";
        let newBalance = parseInt(balance) - parseInt(price);
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                userID: userUid,
                balance : newBalance,
            })
        }).then(() => {
            setErrorMessage("")
            setSuccessMessage ("Order successfully placed !")
            setNumber("")
            setTimeout(()=>{setPaymentConfirmed(true)},1000)
        }).catch((error)=>{
            setErrorMessage(error)
            setSuccessMessage("")
        });
    }
    updateSeats();
  }
  return (
    <Box mt={2}>
      <Typography variant="h3" style={{ color: 'black' }} align="center">Checkout</Typography>
      <h1></h1>
      <hr />
      <div>
        <Grid container spacing={2}>
          { !paymentConfirmed &&
          <Grid item xs={8}>
          {(lackMoney) && <Box sx={{ mt: -1, ml: 29 }}><h2>Since your current balance is 0, please first go to MyProfile page to load in money first </h2></Box>}
          {(balance !== 0) &&
          <div>
            <h1 align="center">Enter your credit card information</h1>
            <Box sx={{ mt: -1, ml: 29 }}>
              <h3>You currently have {balance}$ in your balance, please re-enter your</h3>
              <h3>card number to submit your payment</h3>
            </Box>
            <Box sx={{ mt: 2, ml: 29 }}>
              <TextField label="Cardholder Number" value={number} type="number" onChange={handleNumberChange} />
            </Box>
            <Box sx={{ mt: 2, ml: 29 }}>
              <Typography variant="subtitle2" color="secondary">{errorMessage}</Typography>
            </Box>
            </div>
          }
            <Box sx={{ mt: 3, ml: 28 }}>
              {(balance === 0 || showBackToMyProfile) &&
              <Button variant="contained" color="secondary" style={{ marginTop: 7 }}onClick={() => history.push('/MyProfile')}>Go to MyProfile Page</Button>
              }
              <h1>Order Total</h1>
              <Typography variant="h5">{tripInfo.price}$</Typography>
              {(balance !== 0) &&
              <Button variant="contained" color="secondary" style={{ marginTop: 7 }} onClick={handleSubmit}>Submit</Button>
              }
              <Typography variant="h6" style={{ color: "green" }}>{successMessage}</Typography>
            </Box>
          </Grid>
          }
          {
            paymentConfirmed && 
          <Grid item xs={8}>
            <Box sx={{ mt: 4, ml: 29 }}>
              <h2>Thank you for your purchase !</h2>
              <Button variant="contained" color="secondary" style={{ marginTop: 7 }}onClick={() => history.push('/MyProfile')}>Go to MyProfile Page</Button>
            </Box>
          </Grid>
          }
          <Grid item xs={4}>
            <h1>Order Summary</h1>
            <Typography variant="subtitle1" >1x</Typography>
            <Typography variant="subtitle1" >{tripInfo.origin}-{tripInfo.destination}</Typography>
            <Typography variant="subtitle1">{tripInfo.departure_time}-{tripInfo.arrival_time}</Typography>
            <Typography variant="subtitle1">{tripInfo.trip_date}</Typography>
            <hr />
            <Typography variant="h5">Total Price : {tripInfo.price}$</Typography>
          </Grid>
        </Grid>
      </div>
    </Box>
  )
}

export default Payment;