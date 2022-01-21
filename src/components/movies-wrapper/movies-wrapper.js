import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import MovieList from '../movie-list';
import './movies-wrapper.css';
import Spinner from '../spinner';

function MoviesWrapper({ displayedMovies, isLoading, isError, errorType }) {
  const errorMessage = {
    fetchError: 'Некорректный запрос, попробуйте другой запрос',
    connectionError: 'Проблемы с интернетом, попробуйте позже',
  };

  const spinner = isLoading ? <Spinner /> : null;
  const errorItem = isError ? <Alert type="error" message={errorMessage[errorType]} /> : null;
  const movies = !isLoading && !isError ? <MovieList displayedMovies={displayedMovies} /> : null;

  return (
    <div className="movies-wrapper">
      {spinner}
      {errorItem}
      {movies}
    </div>
  );
}

MoviesWrapper.propTypes = {
  displayedMovies: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  errorType: PropTypes.string,
};

export default MoviesWrapper;
