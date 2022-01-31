import React from 'react';
import PropTypes from 'prop-types';
import './genre.css';

function Genre({ genreName }) {
  return (
    <div className="genre-container">
      <p className="genre-name">{genreName}</p>
    </div>
  );
}

Genre.propTypes = {
  genreName: PropTypes.string,
};

export default Genre;
