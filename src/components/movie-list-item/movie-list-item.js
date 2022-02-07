import React from 'react';
import PropTypes from 'prop-types';
import './movie-list-item.css';
import 'antd/dist/antd.css';
import { Rate } from 'antd';
import defaultImage from './defaultPoster.jpg';
import { MoviesConsumer } from '../../contexts/movie-context';
import DataTransform from '../../utils/data-transform/data-transform';
import Genre from '../genre';

function MovieListItem({ movie, setRating }) {
  const { movieId, movieTitle, movieReleaseDate, movieOverview, movieImageUrl, movieAvgRating, movieGenres } = movie;
  let movieImg = defaultImage;
  let ratingCircleClasses = 'movie-rating-circle';

  const dataTransform = new DataTransform();

  let movieRating = 0;

  movieRating = Number(localStorage.getItem(movieId));

  if (movieImageUrl) {
    movieImg = movieImageUrl;
  }

  if (movieAvgRating >= 0 && movieAvgRating <= 3) {
    ratingCircleClasses += ' low-rating';
  } else if (movieAvgRating > 3 && movieAvgRating <= 5) {
    ratingCircleClasses += ' middle-rating';
  } else if (movieAvgRating > 5 && movieAvgRating <= 7) {
    ratingCircleClasses += ' good-rating';
  } else if (movieAvgRating > 7) {
    ratingCircleClasses += ' perfect-rating';
  }

  function onSetRating(event) {
    setRating(movieId, event);
  }

  return (
    <MoviesConsumer>
      {(genres) => {
        const genresMap = dataTransform.convertGenresArrToMap(genres);
        let movieGenresCards = [];
        if (movieGenres instanceof Array) {
          movieGenresCards = movieGenres.map((genreId) => {
            return <Genre key={genreId} genreName={genresMap.get(genreId)} />;
          });
        }
        return (
          <li className="movie-list-item">
            <div className="movie-poster">
              <img src={movieImg} alt="Movie" />
            </div>
            <div className="movie-info">
              <div className="movie-top-panel">
                <h5 className="movie-title">{movieTitle}</h5>
                <div className={ratingCircleClasses}>
                  <p className="movie-rating">{movieAvgRating}</p>
                </div>
              </div>
              <p className="movie-date">{movieReleaseDate}</p>
              <div className="genres">{movieGenresCards}</div>
              <p className="movie-overview">{movieOverview}</p>
              <div className="rate-container">
                <Rate allowHalf defaultValue={movieRating} count={10} onChange={(event) => onSetRating(event)} />
              </div>
            </div>
          </li>
        );
      }}
    </MoviesConsumer>
  );
}

MovieListItem.propTypes = {
  movie: PropTypes.instanceOf(Object),
  setRating: PropTypes.func,
};

export default MovieListItem;
