import React from 'react';
import 'antd/dist/antd.css';
import { Alert } from 'antd';

function ErrorIndicator() {
  const errorMessage = 'Не удалось загрузить фильмы';
  return <Alert message={errorMessage} type="error" />;
}

export default ErrorIndicator;
