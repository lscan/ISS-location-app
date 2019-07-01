// https://opencagedata.com/

const request = require('request')

const reverseGeocode = (lat, long, callback) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C+${long}&key=4e7cdcaff0454817b2c4585e7a6df155`

    console.log('url: ', url)

    // the response is destructured for simplification
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to geocoding service!', {})
        // } else if (body.features.length < 1) {
            // callback('Something went wrong or this location is just too uninteresting to reverse geocode!', {})
        } else {
            callback(undefined, {
                // features: body.features
                // formatted: body.results[0].formatted,
                // type: body.results[0].components._type,
                // body_of_water: body.results[0].components._type,
                // country: body.results[0].components.country
                results: body.results
            })
        }
    })

}

module.exports = reverseGeocode