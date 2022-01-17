import React from 'react';
import './movie-list.css';

import PropTypes from 'prop-types';
import MovieListItem from '../movie-list-item';

function MovieList({ movieList }) {
  const movies = movieList.map((movie) => {
    return (
      <MovieListItem
        key={movie.id}
        movieTitle={movie.title}
        releaseDate={movie.release_date}
        genres={movie.genre_ids}
        des={movie.overview}
        posterPath={movie.poster_path}
      />
    );
  });
  return <div className="movie-list">{movies}</div>;
}

MovieList.defaultProps = {
  movieList: [],
};

MovieList.propTypes = {
  movieList: PropTypes.arrayOf(PropTypes.object),
};

export default MovieList;
