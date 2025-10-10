import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

const root = createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);
