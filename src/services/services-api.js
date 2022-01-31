export default class ServicesApi {
  _apiKey = '6d476889060ccf750cd2a7fcf27210e7';

  _baseUrl = `https://api.themoviedb.org/3`;

  _imageApiUrl = 'https://image.tmdb.org/t/p/w500';

  _endPoints = {
    searchMovies: '/search/movie',
    newQuestSession: '/authentication/guest_session/new',
    setMovieRating: (movieId) => `/movie/${movieId}/rating`,
    genres: '/genre/movie/list',
    ratedMovies: (questSessionId) => `/guest_session/${questSessionId}/rated/movies`,
  };

  async getResource(endPoint, url) {
    let fetchUrl = null;
    if (url) {
      fetchUrl = `${this._baseUrl}${endPoint}?api_key=${this._apiKey}&${url}`;
    } else {
      fetchUrl = `${this._baseUrl}${endPoint}?api_key=${this._apiKey}`;
    }
    const res = await fetch(fetchUrl);
    if (!res.ok) {
      throw new Error('Could not fetch');
    }
    const jsonRes = await res.json();
    return jsonRes;
  }

  getMovieByKeyword(keyWord, page) {
    const endPoint = this._endPoints.searchMovies;
    return this.getResource(endPoint, `query=${keyWord}&page=${page}`);
  }

  getQuestSessionId() {
    const endPoint = this._endPoints.newQuestSession;
    return this.getResource(endPoint);
  }

  async setMovieRating(movieId, movieRatingValue, questSessionId) {
    const requestBody = {
      value: movieRatingValue,
    };

    const customEndPoint = this._endPoints.setMovieRating(movieId);

    const setMovieRateUrl = `${this._baseUrl}${customEndPoint}`;
    const setMovieRatePar = `?api_key=${this._apiKey}&guest_session_id=${questSessionId}`;

    const res = await fetch(setMovieRateUrl + setMovieRatePar, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(requestBody),
    });

    const result = await res.json();
    console.log(result);
  }

  getGenres() {
    const endPoint = this._endPoints.genres;
    return this.getResource(endPoint);
  }

  getRatedMovies(questSessionId) {
    const endPoint = this._endPoints.ratedMovies(questSessionId);
    return this.getResource(endPoint);
  }
}
