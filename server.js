
const express = require('express') // require the express package
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
const axios = require("axios");
const server = express() // initialize your express app instance
server.use(cors())// a server endpoint 


server.get('/', // our endpoint name
  (request, response) => {
    // callback function of what we should do with our request
    response.send(`Hello World`  // our endpoint function response
    )
  });

const getWeather = require('./controller/Forecast.controller')
const getMovies = require('./controller/Movies.controller');

server.get('/weather', getWeather);

server.get('/movies', getMovies);


server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);

});
