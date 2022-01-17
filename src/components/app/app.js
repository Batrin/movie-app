import React, { Component } from 'react';
import './app.css';
import MovieList from '../movie-list/movie-list';
import ServicesApi from '../../services';

export default class App extends Component {
  state = {
    movieList: [],
  };

  movieApi = new ServicesApi();

  componentDidMount() {
    this.getMovies();
  }

  getMovies() {
    this.movieApi.getMovieByKeyword('return').then((res) => {
      this.setState({
        movieList: res.results,
      });
    });
  }

  render() {
    const { movieList } = this.state;

    return (
      <div className="movie-app-outer">
        <div className="movie-app-inner">
          <MovieList movieList={movieList} />
        </div>
      </div>
    );
  }
}
