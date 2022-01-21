import React from 'react';
import PropTypes from 'prop-types';
import './movie-list-item.css';
import defaultImage from './defaultPoster.jpg';

function MovieListItem({ movie }) {
  const { movieTitle, movieReleaseDate, movieOverview, movieImageUrl, movieAvgRating, movieGenres } = movie;
  let movieImg = defaultImage;

  if (movieImageUrl) {
    movieImg = movieImageUrl;
  }

  return (
    <li className="movie-list-item">
      <div className="movie-poster">
        <img src={movieImg} alt="Movie" />
      </div>
      <div className="movie-info">
        <div className="movie-top-panel">
          <h5 className="movie-title">{movieTitle}</h5>
          <div className="movie-rating-circle">
            <p className="movie-rating">{movieAvgRating}</p>
          </div>
        </div>
        <p className="movie-date">{movieReleaseDate}</p>
        <p className="movie-genres">{movieGenres}</p>
        <p className="movie-overview">{movieOverview}</p>
      </div>
    </li>
  );
}

MovieListItem.propTypes = {
  movie: PropTypes.instanceOf(Object),
};

export default MovieListItem;
