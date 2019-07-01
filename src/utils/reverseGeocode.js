// https://opencagedata.com/

const request = require('request')

const reverseGeocode = (lat, long, callback) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C+${long}&key=4e7cdcaff0454817b2c4585e7a6df155`

    console.log('url: ', url)

    // the response is destructured for simplification
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to geocoding service!', {})
        } else {
            callback(undefined, {
                results: body.results
            })
        }
    })

}

module.exports = reverseGeocode