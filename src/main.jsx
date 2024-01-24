import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'react-redux';
import store from './redux/store.js';
import {BrowserRouter} from "react-router-dom"
import App from './App.jsx';
import Layout from './Layouts/Layout.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

 <BrowserRouter>
  <Provider store={store}>
      <Layout>
    <App />
    </Layout>
  </Provider>
 </BrowserRouter>
 
)

