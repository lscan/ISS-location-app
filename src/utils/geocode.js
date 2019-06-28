const request = require('request')

const geocode = (address, callback) => {
    const location = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibHNjYW5sYW4iLCJhIjoiY2p4Y3Bmcm9qMDV4MTQwdGd5OHo4NGFmbyJ9.TO94FPKYlMMC1Pr5wab3vA&limit=1`

    // we've destructured the response into just body, which enables us to grab values easier down below when we pass the response.body into the callback
    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to geocoding services!', {})
        } else if (body.features.length < 1) {
            callback('Invalid location', {})
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode