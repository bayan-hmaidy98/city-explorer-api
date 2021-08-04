
const express = require('express') // require the express package
const weatherData = require('./data/weather.json')
require('dotenv').config();
const PORT = process.env.PORT
const cors = require('cors');
const server = express() // initialize your express app instance
server.use(cors())// a server endpoint 
server.get('/', // our endpoint name
  (request, response) => {
    // callback function of what we should do with our request
    response.send(`Hello World`  // our endpoint function response
    )
  });

class Forecast {
  constructor(element) {
    this.valid_date = `${element.valid_date}`;
    this.description = `${element.weather.description}`;
  }
}

server.get('/weather', (req, res) => {
  try {
    let searchQuery = req.query.searchQuery;
    let lon = req.query.lon;
    let lat = req.query.lat;

    const weather = weatherData.find(item => item.city_name.toLowerCase() === searchQuery.toLowerCase() || (item.lon === lon && item.lat === lat)
      // lowercase is required in order to allow the user to enter the word in lowercase or uppercase
    );
    const weatherDataArr = weather.data.map(item =>
      // let valid_date = item.valid_date;
      // let description = `Low of ${item.low_temp} , high of ${item.high_temp} with ${item.weather.description} `;
      new Forecast(item));
    res.send(weatherDataArr);


  }
  catch (error) {
    res.send('Error! Please enter a valid city');
    console.log(weatherData);
  }

});


server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
