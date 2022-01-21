import { format } from 'date-fns';

export default class DataTransform {
  transformDate(date) {
    if (!date.length) {
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

  transformGenres(genresArr) {
    if (!genresArr.length) {
      return 'Genres not added';
    }
    return genresArr;
  }
}
