# sidestep
A website to inform users of locations to meet that are a safe distance from known covid-19 cases.

## Changelog
- Replaced Geolocator with built-in HTML5 one
    - https://www.w3schools.com/html/html5_geolocation.asp
- Replaced location search with a free one
    - https://developer.here.com/documentation/examples/rest/places/explore-popular-places-category
- Moved all code over to a `.js` file for easy import into the interface
    - `coronaCalc.js`
- Cleaned up the "get global data" functions
- Implemented the "get locations around me" functions
- Implemented automated pruning of irrelevant locations based on 100 km radius
- Implemented weighted calculation to determine danger level for surrounding locations
- Implemented automated scrubbing of locations marked as too dangerous
- Saved locations along with important data
    - Generated google maps links with string formatting
- Merged javascript into the UI
- Updated a few functions to work better together
- Created whitelist for HERE API so it can't be stolen
- Cleaned up code
- Fixed display in Safari
- Fixed some display bugs with the metric/imperial system conversion
- Added "sort by" functionality
- Added custom domain
- Fixed the way "infected" are counted
- Broke off code into `homeScript.js`
- Added comments
- Cleaned up code
- Changed colors of homepage
- Adjusted responsive UI

## ToDo
- Potentially subtract the number of cured from the overall infected
    - Maybe not a good idea until later because it will basically double the api call time unless run via parallel threads
- Add `Help` page
- Add `About` page

## Resources
- https://github.com/ExpDev07/coronavirus-tracker-api
- https://www.w3schools.com/html/html5_geolocation.asp
- https://developer.here.com/documentation/examples/rest/places/explore-popular-places-category
- Google maps
    - `https://www.google.com/maps/search/place+name/@lat,long`  
- `Bootstrap`
- `jQuery`
- `Ajax`
