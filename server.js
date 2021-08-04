
const express = require('express') // require the express package
require('dotenv').config();
const PORT = process.env.PORT;
const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY;
const WEATHERBIT_URL = process.env.WEATHERBIT_URL;
const MOVIESDB_KEY = process.env.MOVIESDB_KEY;
const MOVIESDB_URL = process.env.MOVIESDB_URL;
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


  server.get('/weather', async (req, res) => {
    const { lon, lat } = req.query;
    const queryParameters = {
      query: {
        key: WEATHERBIT_KEY,
        lon: lon,
        lat: lat,
      }
    }
    const weather = await axios.get(WEATHERBIT_URL, queryParameters);
    const weatherDataArr = weather.data.map(item =>
     
      new Forecast(item));
    // res.send(weatherDataArr);
  });

  server.get('/movies', async (req, res) => {
   const searchQuery = req.query.searchQuery;

   const movies = `${MOVIESDB_URL}?api_key=${MOVIESDB_KEY}&query=${searchQuery}&page=1]`;
   axios.get(movies).then(response => {
    let  moviesRes = response.data.results;

      let moviesList = moviesRes.map(element => {
        return new Movies(element);
      });
      res.send(moviesList);

    }).catch(error=>res.send({message:error.message}));
  });

//     const moviesDataArr = movies.data.map(item =>
//       new BestMovies(item));
//     res.send(moviesDataArr);
 
//   });

// }
// catch (error) {
//   res.send('Error! Please enter a valid city');
//   console.log(weatherData);
// };
server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);

});
