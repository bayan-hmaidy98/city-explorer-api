const axios = require('axios');
const { query } = require('express');
const MOVIESDB_KEY = process.env.MOVIESDB_KEY;
const MOVIESDB_URL = process.env.MOVIESDB_URL;
const Movies = require('../BestMovies')
const Cashe = require('../helper/cache.helper')
let casheObj = new Cashe();


const getMovies = async (req, res) => {
    const searchQuery = req.query.searchQuery;

    const movies = `${MOVIESDB_URL}?api_key=${MOVIESDB_KEY}&query=${searchQuery}&page=1]`;
    axios.get(movies).then(response => {
        let moviesRes = response.data.results;

        let moviesList = moviesRes.map(element => {
            return new Movies(element);
        });
        res.send(moviesList);

    }).catch(error => res.send({ message: error.message }));

   
 casheObj.movies.push({
    'query': query,
    'moviesList': moviesList
})


};
const getMovieFromCache = async (req,res) => {
    let {query} = req.query;
// We need to reset the cache if one day passed 
if ((Date.now() - casheObj.timeStamp) > 86400000){
casheObj = new Cashe;
}

// We need to check if the cache is empty or not 
if (casheObj.movies.length){
    const filterdMovie = casheObj.movies.find (movie => {
        return movie.query === query
    })
    if (filterdMovie){
        res.send(filterdMovie.data)
    }
    else {
        res.send(await getMovies(query))
    }
}
else {
    res.send(await getMovies(query))
}
}


module.exports = getMovies;