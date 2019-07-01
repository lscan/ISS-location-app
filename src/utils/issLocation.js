// http://open-notify.org/

const request = require('request')

const issLocation = (callback) => {
    const url = 'http://api.open-notify.org/iss-now.json'

    // the response is destructured for simplification
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to connect to the ISS location service!', {})
        } else if (body.message !== 'success') {
            callback('Unable to find location!', {})
        } else {
            callback(undefined, {
                message: body.message,
                timestamp: body.timestamp,
                lat: body.iss_position.latitude,
                long: body.iss_position.longitude
            })
        }

    })

}

module.exports = issLocation