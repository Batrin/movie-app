import { format } from 'date-fns';

export default class DataTransform {
  transformDate(date) {
    if (!date) {
      return this._defaultImageUrl;
    }
    return format(new Date(date), 'MMMM d, yyyy');
  }

  transformText(text) {
    if (!text) {
      return 'Описание этого фильма ещё не добавлено';
    }
    const wordArray = text.split(' ');
    wordArray.splice(12, wordArray.length);
    return `${wordArray.join(' ')}...`;
  }

  transformImageUrl(path) {
    if (!path) {
      return '';
    }
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  transformRating(rating) {
    if (!rating) {
      return 0;
    }
    return rating;
  }

  transformGenres(genresIdsArr) {
    if (!genresIdsArr.length) {
      return 'Genres not added';
    }

    return genresIdsArr;
  }

  convertGenresArrToMap(genresNameArr) {
    const genresMap = new Map();
    genresNameArr.forEach((genre) => {
      genresMap.set(genre.id, genre.name);
    });

    return genresMap;
  }
}
