const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/72a8074526e0892da0c7f4cadb91f40c/${lat},${long}`

    // we've destructured the response into just body, which enables us to grab values easier down below when we pass the response.body into the callback
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to forecast service!', {})
        } else if (body.error) {
            callback('Unable to find location!', {})
        } else {
            callback(undefined, {
                currentTemp: body.currently.temperature,
                currentPrecipProbability: body.currently.precipProbability,
                dailySummary: body.daily.summary,
                currentWindGust: body.currently.windGust
            })
        }
    })

}

module.exports = forecast