const SAFE_RADIUS = 100;
const TEST_LOC = ["33.787914", "-117.853104"];
var userLocation = TEST_LOC; // Set here for testing purposes
var relLocs = [];
var safeLocs = [];
var updateTime;
var DANGER_MULTIPLER = 1;
var dangerCutoff = 100; // this needs to be tweeked a little bit
const MtK = 0.6213712;

var PLACES_API_KEY = "T7P7ZUnoaS6UosOf7OKA_WCD5MsH8POrifNjeC8qQeA";

// google maps utl format: https://www.google.com/maps/search/taco+place/@33.8073722,-117.8516195

// Cleaned up version of grabbing the global data
function fnGData() {
    // Replace with some kind of loading function
    console.log("loading...");
    return $.getJSON("https://coronavirus-tracker-api.herokuapp.com/confirmed", function(data) {
        fnCleanGData(data);
    }).then(function(){
        fnGetPlaces("Restaurant");
    });
}

// Cleans the data to remove places that are ridiculously far away
function fnCleanGData(gd) {
    // Grabs the time the data was last updated
    updateTime = gd["last_updated"];

    // Removes all of the places too far away
    $.each(gd["locations"], function(k, v) {
        var recLat = v["coordinates"]["lat"];
        var recLong = v["coordinates"]["long"];
        if(distTwoPts(recLat, recLong, TEST_LOC[0], TEST_LOC[1]) <= SAFE_RADIUS) {
            var parsedItem = {};
            parsedItem["lat"] = v["coordinates"]["lat"];
            parsedItem["long"] = v["coordinates"]["long"];

            var bodyCount = 0;
            $.each(v['history'], function(ks, vs) { bodyCount += Number(vs); });
            parsedItem["infected"] = bodyCount;

            relLocs.push(parsedItem);
        }
    });
}

// temp function to display what's returned
function fnDisplayCleaned() {
    $.each(relLocs, function(k, v) {
        console.log(v["province"]);
    });
}

function fnTesting() {
    fnGData();
}

// Data comes in miles >:(
function fnGetPlaces(category, resultNo = 10) {
    return $.ajax({
        url: 'https://places.ls.hereapi.com/places/v1/discover/explore',
        type: 'GET',
        data: {
            at: `${userLocation[0]},${userLocation[1]}`,
            cat: category,
            apiKey: PLACES_API_KEY,
            size: resultNo.toString()
        },
        beforeSend: function(xhr){
            xhr.setRequestHeader('Accept', 'application/json');
        },
        success: function (data) {
            fnCleanPlaces(data["results"]["items"]);
        }
    });
}

function fnCleanPlaces(pd) {
    var cleanPlaces = [];
    $.each(pd, function(k1,v1) {
        var pLatLong = v1["position"];
        var dangerLevel = 0;

        $.each(relLocs, function(k2,v2) {
            var distance = distTwoPts(pLatLong[0], pLatLong[1],
                parseFloat(v2["lat"]), parseFloat(v2["long"]));

            var dl = v2['infected'] * DANGER_MULTIPLER / distance;

            if(dl > dangerLevel)
                dangerLevel = dl;
        });
        if(dangerLevel < dangerCutoff) {
            var parsedItem = {};
            parsedItem["distance"] = v1['distance']*MtK;
            parsedItem["danger"] = dangerLevel;
            parsedItem["name"] = v1["title"];
            parsedItem["link"] = `https://www.google.com/maps/search/${v1["title"].replace(" ", "+")}/@${userLocation[0]},${userLocation[1]}`;

            safeLocs.push(parsedItem);
        }
    });

    console.log(safeLocs);

    // May need this later
    // safeLocs.sort(function(a, b){return a['danger']-b['danger']});
}

//  --------------------------------------------------------------------
//  Source: https://www.geodatasource.com/developers/javascript
//
//  This routine calculates the distance between two points (given the
//  latitude/longitude of those points). It is being used to calculate
//  the distance between two locations using GeoDataSource (TM)
//  products.
function distTwoPts(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }

    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
     }
 }

 function getLocation() {
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition();
         $("#demo")[0].innerText = "Latitude: " + position.coords.latitude +
         "\nLongitude: " + position.coords.longitude;
       } else {
         $("#demo")[0].innerText = "Geolocation is not supported by this browser.";
       }
 }

 function showPosition(position) {
   $("#demo")[0].innerText = "Latitude: " + position.coords.latitude +
   "\nLongitude: " + position.coords.longitude;
 }
