import React from 'react';
import logo from './logo.png'
import SYMCA from './SYMCA.jpg'
import sstation from './sstation.jpeg'
import scarboughTC from './scarboroughTC.jpeg'
import GLYM from './GLYM.jpeg'
import YMC from './YMC.jpeg'
import SilverCity from './SilverCity.webp'
import Masonville from './Masonville.jpeg'
import LCBO from './LCBO.webp'
import HomeDepot from './HomeDepot.jpeg'
import ArtGallery from './ArtGallery.jpeg'
import CFMM from './CFMM.jpeg'
import GLM from './GLM.jpeg'
import HTCC from './HTCC.jpeg'
import jacksonS from './jacksonS.webp'
import LaSallePark from './LaSallePark.jpeg'
import Walmart from './Walmart.jpeg'
import { AppMenuBar } from '../../AppMenuBar';

function Location() {
  return (
    <>
    <AppMenuBar />
    <div
      style={{
        display: 'flex',
       backgroundColor: '#FFC900',
       backgroundImage: 'fixed',
       fontstyle: 'Arial',
        
        alignItems: 'center',
        
        flexDirection: 'column',
      }}> 
      
    <>
    <br/>
    <img src={logo} alt=""/>
<hr style= {{backgroundColor: 'black',height:'4px', border: '0px'}}/>

    <h1>Fedbus Bus Stops</h1>

  <h3>McCowan Stop (Scarborough)</h3>
  <h5>The McCowan Subway stop at the corner of Bushby and McCowan.</h5>

  
    <iframe style= {{width:"80%", height:"60%", borderRadius: '14px'}}src="https://maps.google.com/maps?q=43.774835,-79.251452&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

    <h5>Places around this stop:</h5>
    <h5>Scarborough YMCA:</h5>
    <img src={SYMCA} alt="" style={{ width: '400px', height: '200px' }} />
    <br />
    <iframe width="40%"height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=Scarborough%20YMCA&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
    <h5>Scarborough Centre Subway Station:</h5>
    <img src={sstation} alt="" style={{ width: '400px', height: '200px' }}/>
    <br />
    <iframe width="40%"height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=Scarborough%20Centre%20station&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

    <h5>Scarborough Town Centre:</h5>
    <img src={scarboughTC} alt="" style={{ width: '400px', height: '200px' }}/>
    <br />
    <iframe width="40%"height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=Scarborough%20Town%20Centre&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
    <br /><br />

    <hr></hr>

    <h3>York Mills - New Stop</h3>
  <h5>Old York Mills Road - near the Shell gas station and York Mills Station Kiss n' Ride.</h5>
  
  <iframe style= {{width:"80%", height:"60%", borderRadius: '14px'}} src="https://maps.google.com/maps?q=43.743558,%20-79.405683&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" ></iframe>
  <h5>Places around this stop:</h5>
    <h5>GoodLife Fitness North York York Mills Centre:</h5>
    <img src={GLYM} alt="" style={{ width: '400px', height: '200px' }} />
  <br />
    <iframe width="40%"height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=GoodLife%20Fitness%20North%20York%20York%20Mills%20Centre&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

    <h5>York Mills Centre:</h5>
    <img src={YMC} alt="" style={{ width: '400px', height: '200px' }} />
    <br />
    <iframe width="40%"height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=York%20Mills%20Centre&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

    <br /><br />

    <hr></hr>

    <h3>Richmond Hill Stop</h3>
  <h5>The York Region Transit and Viva terminal on 8675 Yonge Street. It was built near the ramp that connects Highway 7
    and Yonge Street.</h5>
  <div id="richmondhill"></div>
  <iframe style= {{width:"80%", height:"60%", borderRadius: '14px'}} src="https://maps.google.com/maps?q=43.839636,%20%20-79.425580&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>


  <h5>Places around this stop:</h5>
    <h5>SilverCity Richmond Hill Cinemas:</h5>
    <img src={SilverCity} alt="" style={{ width: '400px', height: '250px' }} />
  <br />
    <iframe width="40%"height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=SilverCity%20Richmond%20Hill%20Cinemas&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
    
    <h5>The Home Depot:</h5>
    <img src={HomeDepot} alt="" style={{ width: '400px', height: '200px' }} />
    <br />
    <iframe width="40%"height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=home%20depot,%20Richmond%20Hill,%20ON%20L4B%204K1,%20Canada&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

    <hr></hr>

  

  <h3>London Stop</h3>
  <h5>At the bus terminal in CF Masonville Place at the corner of Richmond and Fanshawe.</h5>
  <div id="london"></div>

  <iframe style= {{width:"80%", height:"60%", borderRadius: '14px'}} src="https://maps.google.com/maps?q=43.025950,%20-81.281260&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

  <h5>Places around this stop:</h5>
    <h5>CF Masonville Place:</h5>
    <img src={Masonville} alt="" style={{ width: '400px', height: '200px' }} />
    <br />
    <iframe width="40%"height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=CF%20Masonville%20Place&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

    <h5>LCBO:</h5>
    <img src={LCBO} alt="" style={{ width: '400px', height: '250px' }} />
    <br />
    <iframe width="40%"height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=109%20Fanshawe%20lcboPark%20Rd%20E,%20London,%20ON%20N5X%203W1,%20Canada&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

    <hr></hr>

  <h3>Hamilton Stop</h3>
  <h5>Sheraton Hotel entrance at Jackson Square.</h5>
  <div id="hamilton"></div>

  <iframe style= {{width:"80%", height:"60%", borderRadius: '14px'}} src="https://maps.google.com/maps?q=43.257651,%20%20-79.872418&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

  <h5>Places around this stop:</h5>
    <h5>Art Gallery of Hamilton:</h5>
    <img src={ArtGallery} alt="" style={{ width: '400px', height: '200px' }} />
    <br />
    <iframe width="40%"height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=Art%20Gallery%20of%20Hamilton&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

    <h5>Jackson Square:</h5>
    <img src={jacksonS} alt="" style={{ width: '400px', height: '200px' }} />
    <br />
    <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=Jackson%20Square&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
    <br /><br />

    <hr></hr>
  

  <h3>Burlington Stop</h3>
  <h5>Aldershot GO Station, South Parking Lot on Masonry Court.</h5>
  <div id="burlington"></div>

  <iframe style= {{width:"80%", height:"60%", borderRadius: '14px'}} src="https://maps.google.com/maps?q=43.312100,%20-79.851843&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

  <h5>Places around this stop:</h5>
  <h5>LaSalle Park:</h5>
  <img src={LaSallePark} alt="" style={{ width: '400px', height: '200px' }} />
    <br />
    <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=LaSalle%20Park%2050%20North%20Shore%20Blvd%20E,%20Burlington,%20ON%20L7T%204A4,%20Canada&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

    <h5>Hampton Terrace Care Centre:</h5>
    <img src={HTCC} alt="" style={{ width: '400px', height: '200px' }} />
    <br />
    <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=Hampton%20Terrace%20Care%20Centre&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

    <br /><br />

    <hr></hr>

  <h3>Markham Stop</h3>
  <h5>CF Markville - outlying mall parking off of Bullock Drive - near Best Buy / Pickel Barrel but in outlying parking lots.</h5>

  <iframe style= {{width:"80%", height:"60%", borderRadius: '14px'}} src="https://maps.google.com/maps?q=43.868462,%20-79.291938&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

  <h5>Places around this stop:</h5>
    <h5>CF Markville Mall:</h5>
    <img src={CFMM} alt="" style={{ width: '400px', height: '200px' }} />
    <br />
    <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=CF%20Markville&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

    <h5>Walmart Supercentre:</h5>
    <img src={Walmart} alt="" style={{ width: '400px', height: '250px' }} />
    <br />
    <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=Walmart%20Supercentre%205000%20Hwy%207,%20Markham,%20ON%20L3R%204M9,%20Canada&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

    <h5>GoodLife Fitness Markham:</h5>
    <img src={GLM} alt="" style={{ width: '400px', height: '200px' }} />
    <br />
    <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=GoodLife%20Fitness%20Markham%20Markville%20Mall&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
    <br /><br />

    </>

</div>
</>

  );
}

export default Location;
