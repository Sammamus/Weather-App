const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = parseInt(process.argv[2]);

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '/../public');
const viewsPath = path.join(__dirname, '/../templates/views');
const partialsPath = path.join(__dirname, '/../templates/partials');

// Setup statis directory
app.use(express.static(publicDirectoryPath));

// Setup Handlebars Engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

const name = 'Darian Raffle'

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'How can we help you?',
        name
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide an address.'
        });
        return
    }

    const address = req.query.address;

    geocode( address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            console.log(error);
            return res.send({ error });
        }
        
        forecast(latitude, longitude, (error, {descriptions, temp, humid, feels_like} = {}) => {
            if (error) {
                console.log(error);
                return res.send({ error }); 
            }
            
            const forecastMsg = `${descriptions}. The temperature is currently `+
            `at ${temp} degress fahrenheit with ${humid}% humidity combined `+
            `to make it feel like ${feels_like} degrees fahrenheit.`


            res.send({
                forecast: forecastMsg,
                location,
                address
            });
                

            
        });
        
    });

});

// help not found handler
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        msg: 'Help article not found.',
        name
    });
});

// 404 Handler
app.get('*', (req, res) =>{
    res.render('404', {
        title: 404,
        msg: 'Page not found.',
        name
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});