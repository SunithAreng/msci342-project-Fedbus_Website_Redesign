import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import history from '../../Navigation/history';
import { Typography, Button, Grid, Box, TextField } from '@material-ui/core';
import { connect } from "react-redux";

const Payment = (props) => {
  const tripInfo = props.location.state.stuff[0]
  console.log(props.location.state.stuff)
  let tripInfo2 = {}
  let price2 = 0
  let tripId2 = ""
  let seats2 = 0
  if (props.location.state.stuff[1]) {
    tripInfo2 = props.location.state.stuff[1]
    //tripInfo2 stuff
    price2 = tripInfo2.price;
    tripId2 = tripInfo2.trip_id;
    seats2 = tripInfo2.seats;
  } else {
    tripInfo2 = {}
    price2 = 0
    tripId2 = ""
    seats2 = 0
  }
  let [number, setNumber] = React.useState('')
  let [errorMessage, setErrorMessage] = React.useState('')
  let [successMessage, setSuccessMessage] = React.useState('')
  const regexNumber = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
  //tripInfo stuff
  let price = tripInfo.price;
  let tripId = tripInfo.trip_id;
  let seats = tripInfo.seats;
  let [pastTrips, setPastTrips] = React.useState(0)
  //localStorage
  let userUid = localStorage.getItem('userid');
  let token = localStorage.getItem('token');
  // let serverURL = localStorage.getItem('userURL')
  let [balance, setBalance] = React.useState()
  let [lackMoney, setLackMoney] = React.useState(false)
  let [showBackToMyProfile, setShowBackToMyProfile] = React.useState(false)
  let [paymentConfirmed, setPaymentConfirmed] = React.useState(false)
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
        if (balance < (price + price2)) {
          setLackMoney(true)
        } else {
          setLackMoney(false)
        }
      });
  }

  const callApiLoadUserSettings = async () => {
    const url = props.serverURL + "/api/loadUserDetailsPayment";

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
    // console.log("User settings: ", body);
    return body;
  }

  const handleNumberChange = (e) => {
    setNumber(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (balance < (parseInt(price) + parseInt(price2))) {
      setErrorMessage("Your balance is not sufficient for this transaction. Please go back to MyProfile page to load money into your balance")
      setShowBackToMyProfile(true)
      return;
    } else {
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
      const url = props.serverURL + "/api/updateSeats";
      let newSeats = parseInt(seats) - 1;
      let newSeats2;
      if (seats2) {
        newSeats2 = parseInt(seats2) - 1;
      }
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
          trip_id: tripId,
          trip_id2: tripId2,
          seats: newSeats,
          seats2: newSeats2
        })
      }).then(() => {
        addToPastTrips()
      }).catch((error) => {
        setErrorMessage(error)
        setSuccessMessage("")
      });
    }
    const addToPastTrips = () => {
      loadUserSettings()
      const url = props.serverURL + "/api/addToPastTrips";
      let newTrips = ""
      // console.log("Seats number before add to " + pastTrips)
      if (!pastTrips) {
        if (tripId2) {
          newTrips = tripId + " " + tripId2
        } else {
          newTrips = tripId
        }
      } else {
        // newTrips = tripId.toString()
        // console.log("Seats number before add to " + pastTrips)
        if (tripId2) {
          newTrips = pastTrips + " " + tripId.toString() + " " + tripId2.toString()
        } else {
          newTrips = pastTrips + " " + tripId.toString()
        }
        // console.log(newTrips)
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
      }).catch((error) => {
        setErrorMessage(error)
        setSuccessMessage("")
      });
    }
    const changeMoney = () => {
      const url = props.serverURL + "/api/updateUserBalance";
      let newBalance = parseInt(balance) - parseInt(price) - parseInt(price2);
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
          userID: userUid,
          balance: newBalance,
        })
      }).then(() => {
        setErrorMessage("")
        setSuccessMessage("Order successfully placed !")
        setNumber("")
        setTimeout(() => { setPaymentConfirmed(true) }, 1000)
      }).catch((error) => {
        setErrorMessage(error)
        setSuccessMessage("")
      });
    }
    updateSeats()
  }
  return (
    <Box mt={2}>
      <Typography variant="h3" style={{ color: 'black' }} align="center">Checkout</Typography>
      <h1></h1>
      <hr />
      <div>
        <Grid container spacing={2}>
          {!paymentConfirmed &&
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
                  <Button variant="contained" color="secondary" style={{ marginTop: 7 }} onClick={() => history.push('/MyProfile')}>Go to MyProfile Page</Button>
                }
                <h1>Order Total</h1>
                <Typography variant="h5">{tripInfo.price + price2}$</Typography>
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
                <Button variant="contained" color="secondary" style={{ marginTop: 7 }} onClick={() => history.push('/MyProfile')}>Go to MyProfile Page</Button>
              </Box>
            </Grid>
          }
          <Grid item xs={4}>
            <h1>Order Summary</h1>
            <div>
              <Typography variant="subtitle1" >1x</Typography>
              <Typography variant="subtitle1" >{tripInfo.origin}-{tripInfo.destination}</Typography>
              {(tripInfo.departure_time && tripInfo.arrival_time) && <Typography variant="subtitle1">{tripInfo.departure_time}-{tripInfo.arrival_time}</Typography>}
              <Typography variant="subtitle1">{tripInfo.trip_date}</Typography>
              <hr />
            </div>
            {
              (Object.keys(tripInfo2).length !== 0) &&
              <div>
                <Typography variant="subtitle1" >1x</Typography>
                <Typography variant="subtitle1" >{tripInfo2.origin}-{tripInfo2.destination}</Typography>
                <Typography variant="subtitle1">{tripInfo2.departure_time}-{tripInfo2.arrival_time}</Typography>
                <Typography variant="subtitle1">{tripInfo2.trip_date}</Typography>
                <hr />
              </div>
            }
            <Typography variant="h5">Total Price : {tripInfo.price + price2}$</Typography>
          </Grid>
        </Grid>
      </div>
    </Box>
  )
}

function mapStateToProps(state) {
  const serverURL = state.serverURL.value;
  return {
    serverURL
  };
}

export default connect(mapStateToProps)(Payment);