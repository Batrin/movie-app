import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import MovieList from '../movie-list';
import './movies-wrapper.css';
import Spinner from '../spinner';

function MoviesWrapper({ displayedMovies, isLoading, isError, errorType, setRating, currentTab }) {
  const errorMessage = {
    fetchError: 'Некорректный запрос, попробуйте другой запрос',
    connectionError: 'Проблемы с интернетом, попробуйте позже',
    noRatedMovies: 'Либо вы ещё не оценили ни одного фильма, либо при оценке приозошла ошибка',
  };

  let moviesRatedAlert = null;

  if (currentTab === 'rated' && !displayedMovies.length) {
    moviesRatedAlert = <Alert type="info" message={errorMessage.noRatedMovies} />;
  }

  const spinner = isLoading ? <Spinner /> : null;
  const errorItem = isError ? <Alert type="error" message={errorMessage[errorType]} /> : null;
  const movies =
    !isLoading && !isError ? (
      <MovieList currentTab={currentTab} displayedMovies={displayedMovies} setRating={setRating} />
    ) : null;

  return (
    <div className="movies-wrapper">
      {spinner}
      {errorItem}
      {movies}
      {moviesRatedAlert}
    </div>
  );
}

MoviesWrapper.propTypes = {
  displayedMovies: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  errorType: PropTypes.string,
  setRating: PropTypes.func,
  currentTab: PropTypes.string,
};

export default MoviesWrapper;
