const request = require('postman-request')

const geocode = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJkZWxyYWhtYW5tb3N0YWZhMSIsImEiOiJjbDB5YmZ4MXowZXloM2lveXp1NjFuNWlrIn0.aSQRlt87P0nYJk2oaZyQGw&limit=1'
    request({ url: geoUrl, json: true }, (error, response, body) => {
        if (response.statusCode === 401) {
            callback('Unable to connect', undefined)
        } else {
            if (body.features.length === 0) {
                callback('Unable to find geo location', undefined)
            } else {
                const longtitude = body.features[0].geometry.coordinates[0]
                const latitude = body.features[0].geometry.coordinates[1]
                const data = {
                    longtitude: longtitude,
                    latitude: latitude,
                }
                callback(undefined, data)
            }
        }
    });
}

module.exports = geocode