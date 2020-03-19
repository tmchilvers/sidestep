# tmchilvers.github.io
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

## ToDo
- Merge into interface
- Add comments
- Potentially clean up some code
- Potentially subtract the number of cured from the overall infected
    - Maybe not a good idea until later because it will basically double the api call time unless run via parallel threads

## Resources
- https://github.com/ExpDev07/coronavirus-tracker-api
- https://www.w3schools.com/html/html5_geolocation.asp
- https://developer.here.com/documentation/examples/rest/places/explore-popular-places-category
- `Bootstrap`
- `jQuery`
- `Ajax`
