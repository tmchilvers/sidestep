# [Sidestep](https://sidestep.app)
A website to inform users of locations to meet that are a safe distance from known covid-19 cases.

## Contributions
### Matt Raymond
- HTTPS registration
- Custom domain name
- Changing coronavirus APIs
- Initial, utilitarian UI implimentation
- UI redesign
- HERE API implimentation
- Location services implimentation

### Tristan Chilvers
- Finding APIs
- Initial coronavirus API implimentation
- Danger level calculation
- Implimented UI redesign
- Bug fixes for different browsers
- Website hosting

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
- Potentially subtract the number of cured from the overall infected to provide a more accurate danger level

## Resources
- [CoViD-19 API](https://coronadatascraper.com)
- [HTML5 Geolocation](https://www.w3schools.com/html/html5_geolocation.asp)
- [HERE Explore API](https://developer.here.com/documentation/examples/rest/places/explore-popular-places-category)
- [Google Maps)(https://maps.google.com)
    - `https://www.google.com/maps/search/place+name/@lat,long`  
- `Bootstrap`
- `jQuery`
- `Ajax`
