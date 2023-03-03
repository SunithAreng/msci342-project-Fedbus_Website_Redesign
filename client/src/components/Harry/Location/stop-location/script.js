let map;

function initMap() {
    mccowan = new google.maps.Map(document.getElementById("mccowan"), {
        center: { lat: 43.774835, lng: -79.251452 },
        zoom: 18,
    });
    yorkmills = new google.maps.Map(document.getElementById("yorkmills"), {
        center: { lat: 43.743558, lng: -79.405683 },
        zoom: 18,
    });
    richmondhill = new google.maps.Map(document.getElementById("richmondhill"), {
        center: { lat: 43.839636, lng: -79.425580 },
        zoom: 18,
    });
    london = new google.maps.Map(document.getElementById("london"), {
        center: { lat: 43.025950, lng: -81.281260 },
        zoom: 18,
    });
    hamilton = new google.maps.Map(document.getElementById("hamilton"), {
        center: { lat: 43.257651, lng: -79.872418 },
        zoom: 18,
    });
    burlington = new google.maps.Map(document.getElementById("burlington"), {
        center: { lat: 43.312100, lng: -79.851843 },
        zoom: 18,
    });
    markham = new google.maps.Map(document.getElementById("markham"), {
        center: { lat: 43.868462, lng: -79.291938 },
        zoom: 18,
    });

    const mccowanMarker = new google.maps.Marker({
        position: { lat: 43.774835, lng: -79.251452 },
        map: mccowan,
        label: "M",
        title: "McCowan Stop",
        animation: google.maps.Animation.DROP
    });
    const mcinfoWindow = new google.maps.InfoWindow({
        content: "<p>The McCowan Subway stop at the corner of Bushby and McCowan.</p>"
    })
    mcinfoWindow.open(mccowan, mccowanMarker)

    const yorkmillsMarker = new google.maps.Marker({
        position: { lat: 43.743558, lng: -79.405683 },
        map: yorkmills,
        label: "Y",
        title: "York Mills Stop",
        animation: google.maps.Animation.DROP
    });
    const yminfoWindow = new google.maps.InfoWindow({
        content: "<p>Old York Mills Road - near the Shell gas station and York Mills Station Kiss n' Ride.</p>"
    })
    yminfoWindow.open(yorkmills, yorkmillsMarker)

    const richmondhillMarker = new google.maps.Marker({
        position: { lat: 43.839636, lng: -79.425580 },
        map: richmondhill,
        label: "R",
        title: "Richmond Hill Stop",
        animation: google.maps.Animation.DROP
    });
    const rhinfoWindow = new google.maps.InfoWindow({
        content: "<p>The York Region Transit and Viva terminal on 8675 Yonge Street. It was built near the ramp that connects Highway 7 and Yonge Street.</p>"
    })
    rhinfoWindow.open(richmondhill, richmondhillMarker)

    const londonMarker = new google.maps.Marker({
        position: { lat: 43.025950, lng: -81.281260 },
        map: london,
        label: "L",
        title: "London Stop",
        animation: google.maps.Animation.DROP
    });
    const ldinfoWindow = new google.maps.InfoWindow({
        content: "<p>At the bus terminal in CF Masonville Place at the corner of Richmond and Fanshawe.</p>"
    })
    ldinfoWindow.open(london, londonMarker)

    const hamiltonMarker = new google.maps.Marker({
        position: { lat: 43.257651, lng: -79.872418 },
        map: hamilton,
        label: "H",
        title: "Hamilton Stop",
        animation: google.maps.Animation.DROP
    });
    const hminfoWindow = new google.maps.InfoWindow({
        content: "<p>Sheraton Hotel entrance at Jackson Square.</p>"
    })
    hminfoWindow.open(hamilton, hamiltonMarker)

    const burlingtonMarker = new google.maps.Marker({
        position: { lat: 43.312100, lng: -79.851843 },
        map: burlington,
        label: "B",
        title: "Burlington Stop",
        animation: google.maps.Animation.DROP
    });
    const blinfoWindow = new google.maps.InfoWindow({
        content: "<p>Aldershot GO Station, South Parking Lot on Masonry Court.</p>"
    })
    blinfoWindow.open(burlington, burlingtonMarker)

    const markhamMarker = new google.maps.Marker({
        position: { lat: 43.868462, lng: -79.291938 },
        map: markham,
        label: "M",
        title: "Markham Stop",
        animation: google.maps.Animation.DROP
    });
    const mkinfoWindow = new google.maps.InfoWindow({
        content: "<p>CF Markville - outlying mall parking off of Bullock Drive - near Best Buy / Pickel Barrel but in outlying parking lots.</p>"
    })
    mkinfoWindow.open(markham, markhamMarker)
}

window.initMap = initMap;