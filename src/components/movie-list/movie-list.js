import React from 'react';
import PropTypes from 'prop-types';
import MovieListItem from '../movie-list-item/movie-list-item';
import './movie-list.css';

function MovieList({ displayedMovies, setRating, currentTab }) {
  const movieElements = displayedMovies.map((movie) => {
    const { movieId } = movie;
    return <MovieListItem key={movieId} movie={movie} setRating={setRating} currentTab={currentTab} />;
  });
  return <ul className="movies-list">{movieElements}</ul>;
}

MovieList.propTypes = {
  displayedMovies: PropTypes.arrayOf(PropTypes.object),
  setRating: PropTypes.func,
  currentTab: PropTypes.string,
};

export default MovieList;
