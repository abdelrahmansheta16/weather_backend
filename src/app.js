const path = require('path')
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../general')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine (template engine) and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Angolo Kante',
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Angolo Kantes',
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Angolo Kantess',
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Error: You must enter a valid address', })
    }
    geocode(req.query.address, (error, { longtitude, latitude } = {}) => {
        if (error) {
            console.log(error)
            return res.send({ error: 'Error: You must enter a valid address', })
        } else {
            forecast(longtitude, latitude, (error, body) => {
                if (error) {
                    console.log(error)
                    return res.send({ error: 'Error: You must enter a valid address', })
                } else {
                    res.send({
                        forecast: body.current.temperature,
                        location: body.location.name,
                    })
                }
            })
        }
    })


    // if (weather!=undefined && location!=undefined) {

    // } else {
    //     res.send('Something went wrong')
    // }

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page Not found',
        name: 'Angolo Kantess',
        errorMessage: 'farat'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not found',
        name: 'Angolo Kantess',
        errorMessage: 'farat marteen'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})