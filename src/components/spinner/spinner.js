import React from 'react';
import { Spin, Space } from 'antd';
import 'antd/dist/antd.css';

function Spinner() {
  return (
    <Space size="large">
      <Spin size="large" />
    </Space>
  );
}

export default Spinner;
