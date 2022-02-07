import React, { Component } from 'react';
import { Pagination } from 'antd';
import ServicesApi from '../../services';
import DataTransform from '../../utils/data-transform/data-transform';
import MoviesWrapper from '../movies-wrapper';
import Search from '../search';
import 'antd/dist/antd.css';
import './app.css';
import Tabs from '../tabs';
import { MoviesProvider } from '../../contexts/movie-context';

export default class App extends Component {
  state = {
    movieList: [],
    isLoading: true,
    isError: false,
    currentRes: {},
    currentSearchQuery: '',
    errorType: '',
    currentTab: 'search',
    currentPage: 1,
  };

  constructor() {
    super();
    this.moviesApi.getGenres().then((res) => {
      this.genres = res.genres;
    });
  }

  defaultMovieKeyword = 'Harry Potter';

  moviesApi = new ServicesApi();

  dataTransform = new DataTransform();

  questSessionId = null;

  genres = null;

  componentDidMount() {
    const { currentPage } = this.state;
    this.getMoviesBySearch(this.defaultMovieKeyword, currentPage);
    this.moviesApi.getQuestSessionId().then((res) => {
      this.questSessionId = res.guest_session_id;
    });
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
    this.setState({
      currentPage: newPage,
    });
    this.getMoviesBySearch(currentSearchQuery, newPage);
  };

  onTabClick = (event) => {
    const { name } = event.target;
    const { currentSearchQuery, currentPage } = this.state;
    this.setState({
      currentTab: name,
    });

    if (name === 'rated') {
      this.moviesApi.getRatedMovies(this.questSessionId).then((res) => {
        this.setState({
          currentRes: res,
          movieList: res.results,
        });
      });
    } else {
      this.moviesApi.getMovieByKeyword(currentSearchQuery, currentPage).then((res) => {
        this.setState({
          currentRes: res,
          movieList: res.results,
        });
      });
    }
  };

  setRating = (movieId, movieRating) => {
    this.moviesApi.setMovieRating(movieId, movieRating, this.questSessionId);
    localStorage.setItem(movieId, movieRating);
  };

  render() {
    const { movieList, isError, isLoading, currentRes, errorType, currentTab, currentPage } = this.state;
    const displayedData = this.transformMovieData(movieList);
    const search =
      currentTab !== 'rated' ? (
        <Search getSearchMovies={this.getMoviesBySearch} defaultKeyword={this.defaultMovieKeyword} />
      ) : null;

    return (
      <MoviesProvider value={this.genres}>
        <div className="outer-wrapper">
          <div className="inner-wrapper">
            <Tabs onTabClick={this.onTabClick} currentTab={currentTab} />
            {search}
            <MoviesWrapper
              displayedMovies={displayedData}
              isLoading={isLoading}
              isError={isError}
              errorType={errorType}
              setRating={this.setRating}
              currentTab={currentTab}
            />
            <Pagination
              pageSize={20}
              defaultCurrent={1}
              current={currentPage}
              total={currentRes.total_results}
              onChange={this.onPaginationChange}
            />
          </div>
        </div>
      </MoviesProvider>
    );
  }
}
