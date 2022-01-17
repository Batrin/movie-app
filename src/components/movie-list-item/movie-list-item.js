import React from 'react';

import './movie-list-item.css';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

function MovieListItem({ movieTitle, releaseDate, genres, des, posterPath }) {
  const imagePath = `https://image.tmdb.org/t/p/w500${posterPath}`;

  function textFormat(text) {
    const wordArray = text.split(' ');
    wordArray.splice(20, wordArray.length);
    const finalOverview = `${wordArray.join(' ')}...`;
    return finalOverview;
  }

  function dateFormat(date) {
    const formatedDate = format(new Date(date), 'MMMM d, yyyy');
    return formatedDate;
  }

  return (
    <li className="movie">
      <div className="movie-poster">
        <img src={imagePath} alt="" />
      </div>
      <div className="movie-info">
        <h5 className="movie-title">{movieTitle}</h5>
        <p className="movie-date">{dateFormat(releaseDate)}</p>
        <p className="movie-genres">{genres}</p>
        <p className="movie-overview">{textFormat(des)}</p>
      </div>
    </li>
  );
}

MovieListItem.propTypes = {
  movieTitle: PropTypes.string,
  releaseDate: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.number),
  des: PropTypes.string,
  posterPath: PropTypes.string,
};

MovieListItem.defaultProps = {
  movieTitle: '',
  releaseDate: '',
  genres: [],
  des: '',
  posterPath: '',
};

export default MovieListItem;
