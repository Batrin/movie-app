import React, { Component } from 'react';
import { Pagination } from 'antd';
import ServicesApi from '../../services';
import DataTransform from '../../data-transform/data-transform';
import MoviesWrapper from '../movies-wrapper';
import Search from '../search';
import 'antd/dist/antd.css';
import './app.css';

export default class App extends Component {
  state = {
    movieList: [],
    isLoading: true,
    isError: false,
    currentRes: {},
    currentSearchQuery: '',
    errorType: '',
  };

  defaultMovieKeyword = 'return';

  moviesApi = new ServicesApi();

  dataTransform = new DataTransform();

  componentDidMount() {
    this.getMoviesBySearch(this.defaultMovieKeyword);
  }

  onError = (err) => {
    let typeError = '';
    if (err instanceof TypeError) {
      typeError = 'connectionError';
    } else {
      typeError = 'fetchError';
    }
    this.setState({
      isLoading: false,
      isError: true,
      errorType: typeError,
    });
    return [];
  };

  onSuccess = (res) => {
    if (!res.results.length) {
      throw new Error('Could not fetch');
    }
    this.setState({
      isLoading: false,
      currentRes: res,
      isError: false,
    });
    return res.results;
  };

  getMovies(keyWord, page) {
    const movies = this.moviesApi
      .getMovieByKeyword(`${keyWord}`, page)
      .then((res) => {
        console.log(res);
        return this.onSuccess(res);
      })
      .catch((err) => {
        return this.onError(err);
      });
    return movies;
  }

  getMoviesBySearch = (keyWord, page) => {
    this.setState({
      isLoading: true,
    });
    this.getMovies(keyWord, page).then((searchMovies) => {
      this.setState({
        movieList: searchMovies,
        currentSearchQuery: keyWord,
      });
    });
  };

  transformMovieData(moviesArray) {
    const dataTransform = this.dataTransform;
    return moviesArray.map((movie) => {
      return {
        movieId: movie.id,
        movieTitle: movie.title,
        movieReleaseDate: dataTransform.transformDate(movie.release_date),
        movieOverview: dataTransform.transformText(movie.overview),
        movieImageUrl: dataTransform.transformImageUrl(movie.poster_path),
        movieAvgRating: dataTransform.transformRating(movie.vote_average),
        movieGenres: dataTransform.transformGenres(movie.genre_ids),
      };
    });
  }

  onPaginationChange = (event) => {
    const { currentSearchQuery } = this.state;
    const newPage = event;
    this.getMoviesBySearch(currentSearchQuery, newPage);
  };

  render() {
    const { movieList, isError, isLoading, currentRes, errorType } = this.state;
    const displayedData = this.transformMovieData(movieList);

    return (
      <div className="outer-wrapper">
        <div className="inner-wrapper">
          <Search getSearchMovies={this.getMoviesBySearch} defaultKeyword={this.defaultMovieKeyword} />
          <MoviesWrapper
            displayedMovies={displayedData}
            isLoading={isLoading}
            isError={isError}
            errorType={errorType}
          />
          <Pagination
            pageSize={20}
            defaultCurrent={1}
            total={currentRes.total_results}
            onChange={this.onPaginationChange}
          />
        </div>
      </div>
    );
  }
}
