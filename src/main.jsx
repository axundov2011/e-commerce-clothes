import React from 'react';
import ReactDOM from 'react-dom/client';
import MainLayout from './Layouts/MainLayout.jsx';
import './index.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'react-redux';
import store from './redux/store.js';
import {BrowserRouter} from "react-router-dom"
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

 <BrowserRouter>
  <Provider store={store}>
      <MainLayout>
    <App />
    </MainLayout>
  </Provider>
 </BrowserRouter>
 
)
