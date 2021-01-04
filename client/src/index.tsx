import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss?v1.1.0";
import chart from "./chart"
import {BrowserRouter, Route} from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Route exact path="/" component={App}/>
    <Route path="/chart" component={chart}/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
