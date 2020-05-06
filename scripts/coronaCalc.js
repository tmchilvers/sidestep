/*
    This file contains all of the functions that are required to make
    calculations about the coronavirus
*/

// The maximum distance from the user that a covid-19 epicenter must be
// to be considered by the program
const SAFE_RADIUS = 500; //km

// The user's location
var userLocation = []; //[lat, long]

// Locations that are considered close enough to be relevant
var relLocs = [];

// Locations that are considered safe
var safeLocs = [];

// The time when a report was last updated
var updateTime; // TODO: impliment this

// The danger multipler, in case we decide that there needs to be some kind
// of scaling
const DANGER_MULTIPLER = 0.002;

// The user-defined level of danger used as a cutoff
var dangerCutoff;

// Converting miles to kilometers
const MtK = 0.6213712;

// Search distance
var distance;

// Category being searched for
var searchCriteria;

// Key for the places API
const PLACES_API_KEY = "T7P7ZUnoaS6UosOf7OKA_WCD5MsH8POrifNjeC8qQeA";

// API url for the coronavirus API
const CORONA_API = "https://coronavirus-tracker-api.herokuapp.com/confirmed";
const NEW_CORONA_API = "https://coronadatascraper.com/data.json";

// API url for HERE API
const HERE_API = "https://places.ls.hereapi.com/places/v1/discover/explore";

/*
DESC:
    Gets the global coronavirus data
INPUT:
    Takes in a list of safe locations as sL and a function to call after a
    successful API call
OUTPUT:
    None
*/
function fnGData(sL, callback) {
    // Grabs data from the coronavirus API
    return $.getJSON(NEW_CORONA_API, function(data) {
        // Gives status report
        fnSetLoadingText("Cleaning Data");
        // Cleans the global data
        fnCleanGData(data);

        // Once completed, calls the following functions
    }).then(function(){
        // Gives status report
        fnSetLoadingText("Finding Safe Locations");
        // Finds the places around the user's location
        fnGetPlaces(searchCriteria, distance).then(function() {
            // Runs the callback function
            callback(sL);
        })
    });
}
/*
DESC:
    Cleans the data to remove places from the coronavirus dataset that are
    ridiculously far away
INPUT:
    gd as JSON of global data
OUTPUT:
    None
*/
function fnCleanGData(gd) {
    for (var i = 0; i < gd.length; i++) {
        try {
            var recLat = gd[i].coordinates[1];
            var recLong = gd[i].coordinates[0];

            var parsedItem = {};

            // Save lat, long, and number of infected to the item
            parsedItem["lat"] = recLat;
            parsedItem["long"] = recLong;
            parsedItem["infected"] =gd[i].cases;

            // Add the item to the list of locations
            relLocs.push(parsedItem);
        } catch (e) {
            console.log(gd[i]);
        }
    }

    // // Removes all of the places too far away
    // $.each(gd, function(v) {
        // Lat and long of each location

    // });
}

/*
DESC:
    Gets the places around you from the HERE API and cleans them
INPUT:
    Takes in the category of location to search for as category, and the
    distance to search as diestance
OUTPUT:
    None
*/
function fnGetPlaces(category, distance) {
    // userLocation = [33.687930, -117.777511]
    // Creates an AJAX call to the API
    return $.ajax({
        url: HERE_API,
        type: 'GET',
        data: {
            // Converts from km to meters, which is what the API uses
            in: `${userLocation[0]},${userLocation[1]};r=${distance*1000}`,
            size: 100,
            cat: category,
            apiKey: PLACES_API_KEY
        },
        beforeSend: function(xhr){
            xhr.setRequestHeader('Accept', 'application/json');
        },
        // If the call is successful
        success: function (data) {
            // Clean the given results
            fnCleanPlaces(data["results"]["items"]);
        }
    });
}

/*
DESC:
    Takes a list of places and removes the ones that are too close to covid-19
    epicenters
INPUT:
    Takes in a list of places as pd
OUTPUT:
    None
*/
function fnCleanPlaces(pd) {
    // Creates a list of clean places
    var cleanPlaces = [];

    // Cycles through each location in the places around you
    $.each(pd, function(k1,v1) {
        // Grabs the lat and long to make it easier
        var pLatLong = v1["position"];
        var dangerLevel = 0;

        // Cycles through every epicenter
        $.each(relLocs, function(k2,v2) {
            // Calculates the distance from the given location to the given
            // epicenter
            var distance = distTwoPts(pLatLong[0], pLatLong[1],
                parseFloat(v2["lat"]), parseFloat(v2["long"]));


            // Finds the danger level for that given location
            var dl = v2['infected'] * DANGER_MULTIPLER / distance;


            // Update the danger level for that location
            if(dl > dangerLevel)
                dangerLevel = dl;
        });

        // If the danger level is low enough
        if(($("#button-pickSafety")[0].value == SAFETY_LEVELS[2][1]) || (dangerLevel < dangerCutoff)) {
            // Save the important info from the item
            var parsedItem = {};
            parsedItem["distance"] = (v1['distance']/1000);
            parsedItem["danger"] = dangerLevel;
            parsedItem["name"] = v1["title"];

            // Creates a link to google maps for easy veiwing
            parsedItem["link"] = `https://www.google.com/maps/search/${v1["title"].replace(" ", "+")}/@${pLatLong[0]},${pLatLong[1]}`;

            // Push to the list of safe locations
            safeLocs.push(parsedItem);
        }
    });
}

/*
DESC:
    Gets the user's current location
INPUT:
    Takes in a list of safe locations as sL and a function to call as callback
OUTPUT:
    None
*/
function getLocation(sL, callback) {
    // If we already have the user's location, don't ask for it again
    if(userLocation.length != 0) {
        // Go straight to getting global data
        fnGData(sL, callback);
        return;
    }
    else if (navigator.geolocation) {
        // Get the current location
        navigator.geolocation.getCurrentPosition(function(position) {
            // Save to user location
            userLocation = [position.coords.latitude, position.coords.longitude];
            // Update the loding screen
            fnSetLoadingText("Gathering Global Data");
            // Get the global data
            fnGData(sL, callback);
        });
    // If there's an error and you can't get the user's locaiton
    } else {
        // Send an alert
        alert("We were unable to get your location");
    }
 }
