# [Sidestep](https://sidestep.app)
A website that helps users find safe locations to eat/shop/etc. during the ongoing covid-19 pandemic.
## About
- [Sidestep "About" Page](https://sidestep.app/about.html)
- [Conference Poster](https://github.com/tmchilvers/tmchilvers.github.io/blob/master/resources/Poster.pdf)

## Usage
For general information, please refer to [sidestep.app/about.html](https://sidestep.app/about.html), or click the link at the bottom of the home page.  
## Installing/Compiling/Running
Since this project is web-based, there is no installation, compilation, or running needed. Simply enter [sidestep.app](https://sidestep.app) into your browser, and the page should load fine. However, this website does require javascript and location services, so if you are experiencing trouble, it is likely that one of those is blocked. The basics are outlined below, and helpful links are included on the Sidestep "About" page.
- **Javascript:** If the page loads and remains almost totally blank, it is likely that javascript is blocked.
- **Location Services:** If the page loads but locations take forever to load, then it is likely that location services is blocked by your browser.

## Basic Walkthrough
Hopefully, the UI is self-explanatory, but if not, here is a step by step guide to using the site:
1. Navigate to https://sidestep.app
2. Ensure that javascript and location services are enabled, as mentioned above
3. At `Safety Level`, choose the amount of risk that you're willing to take. This is the cutoff for risk, meaning that lower-danger levels will remove results that are considered too dangerous. Changing your selection here will clear the previous search results.
4. At `Category`, select the type of business you're looking for. This will filter the locations around you, so you only get that type of business. Changing your selection here will clear the previous search results.
5. At `Units`, choose whether you want to use `km` (metric) or `miles` (imperial) units for distances. Changing this will not clear your search results.
6. At `Sorting`, choose the way you want the results to be sorted
    - `Closest`: The locations will be displayed with the closest at the top and farthest away at the bottom.
    - `Furthest`: The locations will be displayed with the farthest away at the top and closest at the bottom. 
    - `Safest`: The locations will be displayed with the safest at the top and most dangerous at the bottom.
    - `Dangerous`: The locations will be displayed with the safest at the top and most dangerous at the bottom.
    - `Reverse Alphabetical`: Self-explanatory
    - `Alphabetical`: Self-explanatory
7. At `Search Radius`, enter the farthest distance you are willing to search for businesses. The units will be in whatever you chose in step 5.
8. Press `Search` to view your search results.

## Interpreting Search Results
Each search result will be presented on a small card. This card will have the following features, describer moving left to right:
1. The business name
2. The danger level (visualized as dots)
    - The danger level is rated on a 0-5 system, with full dots indicating values and empty dots acting as placeholders.
        - `○ ○ ○ ○ ○`: No danger. Technically possible, but highly unlikely
        - `● ○ ○ ○ ○`: A small risk
        - `● ● ○ ○ ○`: Mild risk 
        - `● ● ● ○ ○`: Risky
        - `● ● ● ● ○`: Mildly-dangerous
        - `● ● ● ● ●`: Dangerous
        - `● ● ● ● ●, but red`: Off the charts dangerous
3. A vertical bar that serves no purpose other than aesthetics
4. The distance from your location to this business
5. A link to the business in Google Maps
    - This link works most of the time, but not always. We're not sure why, but we think it's because it opens a link in google maps to specific lat and long with a business name, but sometimes Google Maps doesn't know the specific lat and long of that business, so it goes to the lat and long without linking it to a business.

## Contributions
### Matt Raymond
- HTTPS registration
- Custom domain name
- Changing coronavirus APIs
- Initial, utilitarian UI implementation
- UI redesign
- HERE API implementation
- Location services implementation
- README

### Tristan Chilvers
- Finding APIs
- Initial coronavirus API implementation
- Danger level calculation
- Implemented UI redesign
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
- Finished README

## ToDo
- Potentially subtract the number of cured from the overall infected to provide a more accurate danger level

## Resources
- [CoViD-19 API](https://coronadatascraper.com)
- [HTML5 Geolocation](https://www.w3schools.com/html/html5_geolocation.asp)
- [HERE Explore API](https://developer.here.com/documentation/examples/rest/places/explore-popular-places-category)
- [Google Maps](https://maps.google.com)
    - `https://www.google.com/maps/search/place+name/@lat,long`  
- `Bootstrap`
- `jQuery`
- `Ajax`
