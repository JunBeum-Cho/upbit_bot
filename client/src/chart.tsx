import React from 'react';
import './App.css';
import Tabs from "./components/Tabs"
import Alerts from "./components/Alerts"
import Axios from "axios"
import { Button } from "reactstrap";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

class chart extends React.Component {

  async componentDidMount() {

  }

  render() {
    return (
      <div>
        <div style={{width: "100%", display: "inline-block"}}>
          {this.renderChart()}
          {this.renderChart()}
          {this.renderChart()}
        </div>
      </div>
    )
  }

  renderChart() {
    return(
      <div style={{width: "33%", height: "50%"}}>
        <TradingViewWidget
          symbol="NASDAQ:AAPL"
          theme={Themes.Light}
          locale="kr"
          // autosize
        />
      </div>
    )
  }

}

export default chart;
