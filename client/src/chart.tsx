import React from 'react';
import './App.css';
import Tabs from "./components/Tabs"
import Alerts from "./components/Alerts"
import Axios from "axios"
import { Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import TradingViewWidget from 'react-tradingview-widget';
import "./chart.css"
class chart extends React.Component {

  state = {
    exchange: "거래소",
    layout: 33,
    theme: "light",
    editing: false,
    indicators: [
      "LinearRegression@tv-basicstudies",
      "RSI@tv-basicstudies",
      "MASimple@tv-basicstudies"
    ]
  }

  async componentDidMount() {
    
  }

  render() {
    console.log("!@#$!@#")
    return (
      <div>
        <div className="outerdiv">
          {this.renderRadiobtn()}
          {this.renderDropdown()}
        </div>
        <div style={{display: "block"}}>
          {this.renderChart()}
          {this.renderChart()}
          {this.renderChart()}
          {this.renderChart()}
          {this.renderAddChart()}
        </div>
      </div>
    )
  }

  renderRadiobtn() {
    return (
      <div className="inlineblock">
        <div className="custom-control custom-radio mb-3">
          <input
            className="custom-control-input"
            id="customRadio5"
            name="custom-radio-2"
            type="radio"
          />
          <label className="custom-control-label" htmlFor="customRadio5">
            3 X 3
          </label>
        </div>
        <div className="custom-control custom-radio mb-3">
          <input
            className="custom-control-input"
            defaultChecked
            id="customRadio6"
            name="custom-radio-2"
            type="radio"
          />
          <label className="custom-control-label" htmlFor="customRadio6">
            2 X 2
          </label>
        </div>
      </div>
    )
  }

  renderDropdown() {
    return (
      <div className="dropdown">
        <UncontrolledDropdown group>
            <DropdownToggle caret color="secondary">
              {this.state.exchange}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={e => this.setState({exchange: "업비트"})}>
                업비트
              </DropdownItem>
              <DropdownItem onClick={e => this.setState({exchange: "바이낸스"})}>
                바이낸스
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
    )
  }

  renderChart() {
    const width = this.state.layout === 22 ? "50vw" : "33vw"
    return (
      <div className="chart" style={{width:width, height:"50vh"}}>
          <TradingViewWidget
            symbol="BINANCE:BTCUSDT"
            theme="Light"
            interval="5"
            locale="kr"
            autosize
            studies= {this.state.indicators}
          />
      </div>
    )
  }

  renderAddChart() {
    const width = this.state.layout === 22 ? "50vw" : "33vw"
    return(
      this.state.editing
      ? <div style={{display: "inline", width: width, height: "50vh", padding: "4px"}}>
          <div style={{alignContent: "center", width: "75%", height: "75%"}} className="addchart"></div>
        </div>
      : <div style={{display: "inline", width: width, height: "50vh", padding: "4px"}}>
          <div style={{display: "block", alignContent: "center", width: "75%", height: "75%"}} className="addchart greycolor-background"></div>
        </div>
    )
  }
}

export default chart;


