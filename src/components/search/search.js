import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import './search.css';

export default class Search extends Component {
  state = {
    inputValue: '',
  };

  static propTypes = {
    getSearchMovies: PropTypes.func,
    defaultKeyword: PropTypes.string,
  };

  getSearchMovies = this.props.getSearchMovies;

  onInputChange = (event) => {
    this.setState(
      {
        inputValue: event.target.value,
      },
      () => {
        if (this.state.inputValue.length === 0) {
          this.getSearchMovies(this.props.defaultKeyword);
        } else {
          this.getSearchMovies(this.state.inputValue);
        }
      }
    );
  };

  debounceInputChange = debounce(this.onInputChange, 1000);

  render() {
    const placeHolderText = 'What movie you want to search';
    return (
      <input
        placeholder={placeHolderText}
        type="text"
        className="movie-search-input"
        onChange={this.debounceInputChange}
      />
    );
  }
}
