import React, { useEffect } from 'react';

import { AppBar, Button, Container, Toolbar, Box, TextField, Snackbar, Grid, Typography, } from '@material-ui/core';


export const Payment = (props) => {
    let [name, setName] = React.useState('')
    let [number, setNumber] = React.useState('')
    let [mmyy, setMmyy] = React.useState('')
    let [cvv, setCvv] = React.useState('')
    let [money, setMoney] = React.useState()
    let [errorMessage, setErrorMessage] = React.useState('')
    let [successMessage, setSuccessMessage] = React.useState('')
    const regexNumber = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
    const regexMMYY = /^(?:0[1-9]|1[0-2])(\d{2})$/;
    const regexCVV = /^[0-9]{3,4}$/;

    const serverUrl = props.serverUrl;
    const userId = props.userId;
    const currentBalance = props.currentBalance;
    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleMoneyChange = (e) => {
        setMoney(e.target.value)
    }
    const handleNumberChange = (e) => {
        setNumber(e.target.value)
    }
    const handleMmyyChange = (e) => {
        setMmyy(e.target.value)
    }
    const handleCvvChange = (e) => {
        setCvv(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setSuccessMessage("")
        if (!name || !number || !mmyy || !cvv) {
            setErrorMessage("Please fill out all credit card information")
            return;
        }
        if (!money) {
            setErrorMessage("Please enter the amount of money you would like to load into your account")
            return;
        }
        if (!regexNumber.test(number)) {
            setErrorMessage("Please enter correct credit card number")
            return;
        }
        if (!regexMMYY.test(mmyy)) {
            setErrorMessage("Please enter correct MMYY")
            return;
        }
        if (!regexCVV.test(cvv)) {
            setErrorMessage("Please enter correct CVV")
            return;
        }
        const changeMoney = () => {
            var serverURL = serverUrl;
            const url = serverURL + "/api/updateUserBalance";
            console.log("This is the url" + url)
            let newBalance = parseInt(money) + parseInt(currentBalance);
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // authorization: `Bearer ${this.state.token}`
                },
                body: JSON.stringify({
                    userID: userId,
                    balance: newBalance,
                })
            }).then(() => {
                setErrorMessage("")
                setSuccessMessage("Money successfully loaded ! Please refresh to see your new updated balance")
                setName("")
                setMoney("")
                setMmyy("")
                setCvv("")
                setNumber("")
            }).catch((error) => {
                setErrorMessage(error)
            });
        }
        changeMoney();
    }
    // Delete later upon submission
    const handleSubmit2 = (e) => {
        e.preventDefault()
        setSuccessMessage("")
        if (!name || !number || !mmyy || !cvv) {
            setErrorMessage("Please fill out all credit card information")
            return;
        }
        if (!money) {
            setErrorMessage("Please enter the amount of money you would like to load into your account")
            return;
        }
        const changeMoney2 = () => {
            var serverURL = serverUrl;
            const url = serverURL + "/api/updateUserBalance";
            console.log("This is the url" + url)
            let newBalance = parseInt(money)
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // authorization: `Bearer ${this.state.token}`
                },
                body: JSON.stringify({
                    userID: userId,
                    balance: newBalance,
                })
            }).then(() => {
                setErrorMessage("")
                setSuccessMessage("Money successfully loaded ! Please refresh to see your new updated balance")
                setName("")
                setMoney("")
                setMmyy("")
                setCvv("")
                setNumber("")
            }).catch((error) => {
                setErrorMessage(error)
            });
        }
        changeMoney2();
    }
    return (
        <div className="Payment Method">
            <form>
                <h2>Load money into your balance </h2>
                <h4>Current Balance : {currentBalance}</h4>
                <h3>Cardholder Name</h3>
                <TextField
                    variant="outlined"
                    type="text"
                    style={{ width: '250px' }}
                    value={name} onChange={handleNameChange} />
                <h3>Cardholder Number</h3>
                <TextField
                    variant="outlined"
                    type="number"
                    style={{ width: '250px' }}
                    value={number} onChange={handleNumberChange} />
                <h3>MMYY</h3>
                <TextField
                    variant="outlined"
                    type="number"
                    value={mmyy}
                    style={{ width: '250px' }} onChange={handleMmyyChange} />
                <h3>CVV</h3>
                <TextField
                    variant="outlined"
                    type="number"
                    style={{ width: '250px' }} value={cvv} onChange={handleCvvChange} />
                <h3>Amount of money you would like to load in</h3>
                <TextField
                    variant="outlined"
                    type="number"
                    value={money}
                    style={{ width: '250px' }} onChange={handleMoneyChange} />
                <br /><br />
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
                    Confirm payment
                </Button>
                <Button variant="contained" color="secondary" onClick={handleSubmit2}>
                    Reset your money to this amount (just fill out random stuff for the form, no strict regex check)
                </Button>
                <Typography variant="subtitle2" color="secondary">{errorMessage}</Typography>
                <Typography variant="h6" style={{ color: "green" }}>{successMessage}</Typography>
                <br /><br />
                <hr style={{ backgroundColor: 'black', height: '3px', border: '0px' }} />
            </form>
        </div>)
}