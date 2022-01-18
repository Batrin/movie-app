import React from 'react';
import PropTypes from 'prop-types';
import MovieList from '../movie-list/movie-list';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

function MovieListWrapper({ movieList, isLoading, isError }) {
  const movieListComponent = !isLoading ? <MovieList movieList={movieList} /> : null;
  const spinner = isLoading ? <Spinner /> : null;
  const errorIndicator = isError ? <ErrorIndicator /> : null;

  return (
    <>
      {movieListComponent}
      {spinner}
      {errorIndicator}
    </>
  );
}

MovieListWrapper.defaultProps = {
  movieList: [],
  isLoading: false,
  isError: false,
};

MovieListWrapper.propTypes = {
  movieList: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
};

export default MovieListWrapper;
