import React from 'react';
import { AppMenuBar } from '../../AppMenuBar';

function Location() {
  return (
    <>
      <AppMenuBar />
      <div
        style={{
          display: 'flex',
          // backgroundColor: '#FFC900',
          // backgroundImage: 'fixed',
          fontstyle: 'Arial',
          alignItems: 'center',
          flexDirection: 'column',
        }}>

        <>
          <br />
          <img src="https://fedbus.wusa.ca/img/fedbus-logo.png" alt="" />
          <hr style={{ backgroundColor: 'black', height: '4px', border: '0px' }} />

          <h1>Fedbus Bus Stops</h1>

          <h3>McCowan Stop (Scarborough)</h3>
          <h5>The McCowan Subway stop at the corner of Bushby and McCowan.</h5>


          <iframe style={{ width: "80%", height: "60%", borderRadius: '14px' }} src="https://maps.google.com/maps?q=43.774835,-79.251452&t=&z=17&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <h5>Places around this stop:</h5>
          <h5>Scarborough YMCA:</h5>
          <img src="https://www.acotoronto.ca/images/buildings/Large/YMCAScarborough1.jpg" alt="" style={{ width: '400px', height: '200px' }} />
          <br />
          <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=Scarborough%20YMCA&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="yes"
            marginHeight="0"
            marginWidth="0"></iframe>
          <h5>Scarborough Centre Subway Station:</h5>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Scarborough_Centre_RT_station_%282%29.jpg/1200px-Scarborough_Centre_RT_station_%282%29.jpg" alt="" style={{ width: '400px', height: '200px' }} />
          <br />
          <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=Scarborough%20Centre%20station&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <h5>Scarborough Town Centre:</h5>
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Scarborough_Town_Centre_Front.jpg" alt="" style={{ width: '400px', height: '200px' }} />
          <br />
          <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=Scarborough%20Town%20Centre&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>
          <br /><br />

          <hr></hr>

          <h3>York Mills - New Stop</h3>
          <h5>Old York Mills Road - near the Shell gas station and York Mills Station Kiss n' Ride.</h5>

          <iframe style={{ width: "80%", height: "60%", borderRadius: '14px' }} src="https://maps.google.com/maps?q=43.743558,%20-79.405683&t=&z=17&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" ></iframe>
          <h5>Places around this stop:</h5>
          <h5>GoodLife Fitness North York York Mills Centre:</h5>
          <img src="https://s3-media0.fl.yelpcdn.com/bphoto/NvoCa5GYpUff5KWc1RLKBg/o.jpg" alt="" style={{ width: '400px', height: '200px' }} />
          <br />
          <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=GoodLife%20Fitness%20North%20York%20York%20Mills%20Centre&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <h5>York Mills Centre:</h5>
          <img src="https://dpbvj4a9anukr.cloudfront.net/16fca300-93a5-4853-87e3-785dfd7e33d9/cb3b37d1-1a11-419d-9873-d1b610bda910/c402efc3795ff9b9f7833121a9a97c3a/WEB-4.jpg" alt="" style={{ width: '400px', height: '200px' }} />
          <br />
          <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=York%20Mills%20Centre&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <br /><br />

          <hr></hr>

          <h3>Richmond Hill Stop</h3>
          <h5>The York Region Transit and Viva terminal on 8675 Yonge Street. It was built near the ramp that connects Highway 7
            and Yonge Street.</h5>
          <div id="richmondhill"></div>
          <iframe style={{ width: "80%", height: "60%", borderRadius: '14px' }} src="https://maps.google.com/maps?q=43.839636,%20%20-79.425580&t=&z=17&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>


          <h5>Places around this stop:</h5>
          <h5>SilverCity Richmond Hill Cinemas:</h5>
          <img src="https://ir.4sqi.net/img/general/original/2727355_D2KUkmozE3mEz-RQyzsJj8ve2mVlV3nW8vJqlhzxNuM.jpg" alt="" style={{ width: '400px', height: '250px' }} />
          <br />
          <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=SilverCity%20Richmond%20Hill%20Cinemas&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <h5>The Home Depot:</h5>
          <img src="https://esimopt.yelpcdn.com/bphoto/OWR1GqRdxQiQCb2ju-WUww/l.jpg" alt="" style={{ width: '400px', height: '200px' }} />
          <br />
          <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=home%20depot,%20Richmond%20Hill,%20ON%20L4B%204K1,%20Canada&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <hr></hr>



          <h3>London Stop</h3>
          <h5>At the bus terminal in CF Masonville Place at the corner of Richmond and Fanshawe.</h5>
          <div id="london"></div>

          <iframe style={{ width: "80%", height: "60%", borderRadius: '14px' }} src="https://maps.google.com/maps?q=43.025950,%20-81.281260&t=&z=17&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <h5>Places around this stop:</h5>
          <h5>CF Masonville Place:</h5>
          <img src="https://retailinsider.b-cdn.net/wp-content/uploads/2023/02/210829-Masonville-0723b-r-1-scaled.jpeg" alt="" style={{ width: '400px', height: '200px' }} />
          <br />
          <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=CF%20Masonville%20Place&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <h5>LCBO:</h5>
          <img src="https://images.thestar.com/TTuLQAJCOd7joqdOi6hv1gNMXIk=/1200x720/smart/filters:cb(1608747628036):format(webp)/https://www.stcatharinesstandard.ca/content/dam/niagaradailies/business/2020/12/23/unidentified-number-of-fort-erie-lcbo-employees-test-positive-for-covid-19/lcbo_fort_erie.jpg" alt="" style={{ width: '400px', height: '250px' }} />
          <br />
          <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=109%20Fanshawe%20lcboPark%20Rd%20E,%20London,%20ON%20N5X%203W1,%20Canada&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <hr></hr>

          <h3>Hamilton Stop</h3>
          <h5>Sheraton Hotel entrance at Jackson Square.</h5>
          <div id="hamilton"></div>

          <iframe style={{ width: "80%", height: "60%", borderRadius: '14px' }} src="https://maps.google.com/maps?q=43.257651,%20%20-79.872418&t=&z=17&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <h5>Places around this stop:</h5>
          <h5>Art Gallery of Hamilton:</h5>
          <img src="https://attractionsontario.ca/wp-content/uploads/2019/04/Art-Gallery-of-Hamilton.jpg" alt="" style={{ width: '400px', height: '200px' }} />
          <br />
          <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=Art%20Gallery%20of%20Hamilton&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <h5>Jackson Square:</h5>
          <img src="https://images.thestar.com/9WNyvvTHycFrAgaTSGi5wNtiZkg=/1200x800/smart/filters:cb(1670846174270):format(webp)/https://www.thespec.com/content/dam/thespec/news/hamilton-region/flashbacks-hamilton/2022/12/06/at-50-years-of-age-jackson-square-has-seen-it-all/jackson_exterior.jpg" alt="" style={{ width: '400px', height: '200px' }} />
          <br />
          <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=Jackson%20Square&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>
          <br /><br />

          <hr></hr>


          <h3>Burlington Stop</h3>
          <h5>Aldershot GO Station, South Parking Lot on Masonry Court.</h5>
          <div id="burlington"></div>

          <iframe style={{ width: "80%", height: "60%", borderRadius: '14px' }} src="https://maps.google.com/maps?q=43.312100,%20-79.851843&t=&z=17&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <h5>Places around this stop:</h5>
          <h5>LaSalle Park:</h5>
          <img src="https://www.myweddingedge.ca/wp-content/uploads/2017/08/IMG_4994-580x347.jpg" alt="" style={{ width: '400px', height: '200px' }} />
          <br />
          <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=LaSalle%20Park%2050%20North%20Shore%20Blvd%20E,%20Burlington,%20ON%20L7T%204A4,%20Canada&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <h5>Hampton Terrace Care Centre:</h5>
          <img src="https://www.hamptonterrace.ca/images/header/hampton_front.jpg" alt="" style={{ width: '400px', height: '200px' }} />
          <br />
          <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=Hampton%20Terrace%20Care%20Centre&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <br /><br />

          <hr></hr>

          <h3>Markham Stop</h3>
          <h5>CF Markville - outlying mall parking off of Bullock Drive - near Best Buy / Pickel Barrel but in outlying parking lots.</h5>

          <iframe style={{ width: "80%", height: "60%", borderRadius: '14px' }} src="https://maps.google.com/maps?q=43.868462,%20-79.291938&t=&z=17&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <h5>Places around this stop:</h5>
          <h5>CF Markville Mall:</h5>
          <img src="https://images.ctfassets.net/70unvdt5g4gf/2N7QIKnu7AHJT2Bk74Y3kz/5ae9404699af247d05befb3a9ddcb2da/CF_Markville_Mall.jpeg" alt="" style={{ width: '400px', height: '200px' }} />
          <br />
          <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=CF%20Markville&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <h5>Walmart Supercentre:</h5>
          <img src="https://fastly.4sqi.net/img/general/600x600/39535153_oH30yGEkkaX3NeHgWJ3Qw-yZmb1OYHpQDIa6K6hb3mI.jpg" alt="" style={{ width: '400px', height: '250px' }} />
          <br />
          <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=Walmart%20Supercentre%205000%20Hwy%207,%20Markham,%20ON%20L3R%204M9,%20Canada&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>

          <h5>GoodLife Fitness Markham:</h5>
          <img src="https://media.freshdaily.ca/static/articles/20200812-goodlife-fitness.png?w=2048&cmd=resize_then_crop&height=1365&quality=70" alt="" style={{ width: '400px', height: '200px' }} />
          <br />
          <iframe width="40%" height="20%" id="gmap_canvas" src="https://maps.google.com/maps?q=GoodLife%20Fitness%20Markham%20Markville%20Mall&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0"></iframe>
          <br /><br />

        </>

      </div>
    </>

  );
}

export default Location;
