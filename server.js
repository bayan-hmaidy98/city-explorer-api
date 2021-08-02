const { request, response } = require('express');
const weather = require ('./data/weather.json')
const express = require('express') // require the express package
require('dotenv').config();
const PORT = process.env.PORT
const cors = require('cors');
const app = express() // initialize your express app instance
app.use(cors())// a server endpoint 
app.get('/weather', // our endpoint name
  (request, response) => { 
      // callback function of what we should do with our request
  response.send('Hello World') // our endpoint function response
})
 
class Forecast {
    constructor(date,description){
      this.date =date;
      this.description = description;
    }
  }
  
  server.get('/weather',(req,res)=>{
  
    let searchQuery = req.query.searchQuery;
    let lon = req.query.latitude;
    let lat = req.query.longitudinal;
    const weather =  weatherData.find((item) => {
      if (item.city_name === searchQuery && item.lon === lon && item.lat === lat) {
        return(item);
      }
  
    });
    try {
      const weatherDataArr = weather.data.map(item => {
        let date = item.valid_date;
        let description = `Low of ${item.low_temp} , high of ${item.high_temp} with ${item.weather.description} `;
        return new Forecast(date,description);
      });
      res.send(weatherDataArr);
    }
    catch(error) {
      res.send('Error! Please enter a valid city');
      console.log(weatherData);
    }
  
  });
  

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
