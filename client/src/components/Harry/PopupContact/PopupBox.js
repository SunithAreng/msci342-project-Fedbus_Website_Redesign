import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
export const Popup = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  let serverURL = props.serverURL
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 10px',
    cursor: 'pointer',
  };

  return (
    <div className="App">
      <button onClick={togglePopup} style={buttonStyle}>
        Any questions ? Contact us !
      </button>
      <PopupBox message="The Fedbus Desk." show={showPopup} serverURL={serverURL} />
    </div>
  );
}

const PopupBox = ({ message, show, serverURL }) => {
  const popupStyle = {
    position: 'fixed',
    bottom: '60px',
    right: '20px',
    backgroundColor: '#FAA900',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    opacity: show ? 1 : 0,
    visibility: show ? 'visible' : 'hidden',
    transition: 'all 0.3s ease',
    width: '300px',
    height: '450px',
  };

  const buttonStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '20px',
    marginBottom: '200px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    width: '100%'

  };
  let [name, setName] = React.useState("")
  let [email, setEmail] = React.useState("")
  let [question, setQuestion] = React.useState("")
  let [errorMessage, setErrorMessage] = React.useState("")
  let [successMessage, setSuccessMessage] = React.useState("")
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  let handleName = (e) => {
    setName(e.target.value)
  }
  let handleEmail = (e) => {
    setEmail(e.target.value)
  }
  let handleQuestion = (e) => {
    setQuestion(e.target.value)
  }
  let handleSubmit = (e) => {
    e.preventDefault()
    setSuccessMessage("")
    if (!name || !email || !question){
      setErrorMessage("Please fill out all information")
      return;
    }
    if (!regexEmail.test(email)) {
        setErrorMessage("Please enter correct email")
        return;
    }
    addNewQuestion()
  }
  const addNewQuestion = () => {
    const url = serverURL + "/api/addQuestion";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        name: name,
        email: email,
        questions: question
      })
    }).then(() => {
      setErrorMessage("")
      setSuccessMessage("Question sent ! We will get back to you as quick as possible")
      setName("")
      setEmail("")
      setQuestion("")
    }).catch((error) => {
      setErrorMessage(error)
    });
  }
  return (
    <div style={popupStyle}>
      <div>{message}</div>
      <img src="https://fedbus.wusa.ca/img/fedbus-logo.png" alt="Local" style={{ backgroundColor: 'Orange', maxWidth: '100%', marginBottom: '10px', marginTop: '10px' }} />
      <div>
        <input type="text" placeholder="Your Name: " style={{ display: 'block', marginBottom: '10px', width: '100%', height: '30px', backgroundColor: 'lightyellow' }} value={name} onChange={handleName} />
        <input type="email" placeholder="Your Email: " style={{ display: 'block', marginBottom: '10px', width: '100%', height: '30px', backgroundColor: 'lightyellow' }} value={email} onChange={handleEmail} />
        <input type="text" placeholder="Your Question: " style={{ display: 'block', marginBottom: '10px', width: '100%', height: '90px', backgroundColor: 'lightyellow' }} value={question} onChange={handleQuestion} />
        {errorMessage && <Typography>{errorMessage}</Typography>}
        {successMessage && <Typography>{successMessage}</Typography>}
      </div>
      <button style={buttonStyle} onClick={handleSubmit}>Submit</button>
    </div>
  );
}

