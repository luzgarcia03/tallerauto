import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ✅ Bootstrap CSS y JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// ✅ AdminLTE CSS y JS
import 'admin-lte/dist/css/adminlte.min.css';
import 'admin-lte/dist/js/adminlte.min.js';

// ✅ Font Awesome (iconos)
import '@fortawesome/fontawesome-free/css/all.min.css';

// ✅ Solo una vez jQuery si es necesario (AdminLTE lo usa internamente con Bootstrap 4)
import 'jquery';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
