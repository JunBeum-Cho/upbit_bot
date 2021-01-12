import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss?v1.1.0";
import store from "./redux/store"
import {Provider} from 'react-redux'
import IndexChart from "./index_chart"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {JsonViewer} from "./components/JsonViewer"

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Switch>
          <Route exact path="/bot" component={App}/>
          <Route exact path="/kimp" component={JsonViewer}/>
          <Route path="/" component={IndexChart}/>
        </Switch>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
