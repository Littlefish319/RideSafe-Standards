import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// NOTE: CSS is loaded via CDN in index.html for browser compatibility.
// Do not import './index.css' here as it crashes the preview environment.

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);