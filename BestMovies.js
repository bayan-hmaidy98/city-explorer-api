class BestMovies {
    constructor(element) {
      this.title = element.results.original_title;
      this.overview = element.results.overview;
      this.average_votes = element.results.vote_average;
      this.total_votes = element.results.vote_count;
      this.image_url = element.results.poster_path;
      this.popularity = element.results.popularity;
      this.released_on = element.results.release_date;
    }
  }
  module.exports = BestMovies;