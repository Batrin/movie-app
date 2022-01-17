export default class ServicesApi {
  _apiKey = '6d476889060ccf750cd2a7fcf27210e7';

  _baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${this._apiKey}`;

  async getResource(url) {
    const res = await fetch(`${this._baseUrl}&${url}`);
    if (!res.ok) {
      throw new Error('Could not fetch');
    }
    const jsonRes = await res.json();
    return jsonRes;
  }

  getMovieByKeyword(keyWord) {
    return this.getResource(`query=${keyWord}`);
  }
}
