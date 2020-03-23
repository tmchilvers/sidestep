/*
DESC:
    This routine calculates the distance between two points (given the
    latitude/longitude of those points). It is being used to calculate
    the distance between two locations using GeoDataSource (TM)
    products.
INPUT:
    The first point's latitude and longitude as lat1 and lon2, as well as the
    second points latitude and longitude as lat2 and lon2. Also takes in a char
    as a unit conversion, but we don't ever use that
OUTPUT:
    Distance as a float
SOURCE:
    https://www.geodatasource.com/developers/javascript
*/
function distTwoPts(lat1, lon1, lat2, lon2, unit) {
    // If the points are the same, just return 0
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
