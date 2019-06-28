const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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
        title: 'Weather app',
        name: 'Lee',
        authorName: 'Leland Scanlan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ME',
        name: 'Lee',
        authorName: 'Leland Scanlan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some halp!ful text.',
        title: 'halp!',
        name: 'Lee',
        authorName: 'Leland Scanlan'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: 'help 404',
        authorName: 'Leland Scanlan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address required'
        })
    }
    
    const address = req.query.address

    geocode(address, (error, {lat, long, location}) => {
        
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(lat, long, (error,{currentTemp, currentPrecipProbability, dailySummary, currentWindGust}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                locationData: {
                    lat,
                    long,
                    location
                },
                forecastData: {
                    currentTemp,
                    currentPrecipProbability,
                    dailySummary,
                    currentWindGust
                },
                address
            })

        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search term required'
        })
    }
    res.send({
        products: []
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