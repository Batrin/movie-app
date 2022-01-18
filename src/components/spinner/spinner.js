import { Spin, Space } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';

function Spinner() {
  return (
    <Space size="middle">
      <Spin size="large" />
    </Space>
  );
}

export default Spinner;
