import React from 'react'
import './style.css'
import logo from './logo.png'



export default function Profile() {
 
  return (
<>
<br/>
<img src={logo} alt=""/>
<br/><br/>
<hr style= {{backgroundColor: 'black',height:'4px', border: '0px'}}/>
      <div className="rightbox">
        <div className="Personal Info">
          
          <h2>Personal Info</h2>
          <h3>Full Name</h3>
          <input type="text" style={{width:'100px'}}className="input" defaultValue="Harry Yao" />
          <h3>Birthday</h3>
          <input type="text" style={{width:'140px'}}className="input" defaultValue="January 1, 2000" />
          <h3>Gender</h3>
          <input type="text" style={{width:'60px'}}className="input" defaultValue="Male" />
          <h3>Email</h3>
          <input type="text" style={{width:'200px'}}className="input" defaultValue="example@example.com" />
          <h3>Password</h3>
          <input type="password" style={{width:'100px'}}className="input" defaultValue="brightcode" />
          <br/><br/>
          <button className="btn">Update Personal Info</button>
          <br/><br/>
          <hr style= {{backgroundColor: 'black',height:'3px', border: '0px'}}/>
          
        </div>

        <div className="Payment Method">
          <h2>Payment Info</h2>
          <h3>Payment Method</h3>
          <input type="text" style={{width:'200px'}} className="input" defaultValue="Visa - 0919 **** **** 1413" />
          <h3>Billing Address</h3>
          <input type="text" style={{width:'180px'}}className="input" defaultValue="XXX St, Waterloo, ON" />
          <h3>Postal Code</h3>
          <input type="text" style={{width:'80px'}}className="input" defaultValue="N2L XXX" />
          <br/><br/>
          <button className="btn">Update Payment Method</button>
          <br/><br/>
          <hr style= {{backgroundColor: 'black',height:'3px', border: '0px'}}/>
         
        </div>

        <div className="History & Settings">
          <h2>History & Settings</h2>
          <p/>
          <h3>Trips History</h3>
          <p/>
          <h3>Favorite Trips</h3>
          <p/>
          <h3>Route Watchlist</h3>
          <p/>
          <h3>My Reviews</h3>
          <p/>
          
          <br/>
        </div>

      </div>
      </>
  );
  }