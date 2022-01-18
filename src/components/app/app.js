import React, { Component } from 'react';
import './app.css';
import ServicesApi from '../../services';
import MovieListWrapper from '../movie-list-wrapper';

export default class App extends Component {
  state = {
    movieList: [],
    isLoading: true,
    isError: false,
  };

  movieApi = new ServicesApi();

  componentDidMount() {
    this.getMovies();
  }

  onError() {
    this.setState({
      isError: true,
      isLoading: false,
    });
  }

  getMovies() {
    this.movieApi
      .getMovieByKeyword('return')
      .then((res) => {
        this.setState({
          movieList: res.results,
          isLoading: false,
        });
      })
      .catch(() => {
        this.onError();
      });
  }

  render() {
    const { movieList, isLoading, isError } = this.state;

    return (
      <div className="movie-app-outer">
        <div className="movie-app-inner">
          <MovieListWrapper movieList={movieList} isLoading={isLoading} isError={isError} />
        </div>
      </div>
    );
  }
}
