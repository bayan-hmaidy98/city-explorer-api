const axios = require('axios');
const MOVIESDB_KEY = process.env.MOVIESDB_KEY;
const MOVIESDB_URL = process.env.MOVIESDB_URL;
const Movies = require('./BestMovies')

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
};

module.exports = getMovies;