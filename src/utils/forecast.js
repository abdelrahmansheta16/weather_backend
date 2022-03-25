const request = require('postman-request')

const forecast = (longtitude, latitude, callback) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=a77cdee88ee4f3c7aa337462b2752128&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longtitude)
    request({ url: weatherUrl, json: true }, (error, response, body) => {
        if (body.error) {
            if (body.error.code === 101) {
                callback('unable to connect', undefined)

            } else {
                callback('unable to find forecast location', undefined)
            }
        } else {
            callback(undefined, body)
        }
    });
}

module.exports = forecast