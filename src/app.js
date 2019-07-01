const path = require('path')
const express = require('express')
const hbs = require('hbs')
const issLocation = require('./utils/issLocation.js')
const reverseGeocode = require('./utils/reverseGeocode.js')

const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'ISS Location app',
        authorName: 'Leland Scanlan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About the ISS',
        authorName: 'Leland Scanlan'
    })
})

app.get('/iss-location', (req, res) => {

    issLocation((error, { message, timestamp, lat, long }) => {

        if (error) {
            return res.send({
                error: error
            })
        }

        reverseGeocode(lat, long, (error, { results }) => {

            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                results,
                coordinates: {
                    lat,
                    long
                }
            })

        })

    })

})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        title: '404',
        authorName: 'Leland Scanlan'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})