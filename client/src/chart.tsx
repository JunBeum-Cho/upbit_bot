import React from 'react';
import './App.css';
import Tabs from "./components/Tabs"
import Alerts from "./components/Alerts"
import Axios from "axios"
import { Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import TradingViewWidget from 'react-tradingview-widget';

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
    return (
      <div>
        <div style={{display: "block", maxWidth: "80%", alignContent: "center", padding: "40px"}}>
          {this.renderRadiobtn()}
          {this.renderDropdown()}
        </div>
        <div style={{display: "block"}}>
          {this.renderChart()}
          {this.renderAddChart()}
        </div>
      </div>
    )
  }

  renderRadiobtn() {
    return (
      <div style={{display: "inline-block"}}>
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
              <DropdownItem href="#pablo" onClick={e => {this.setState({name: "업비트"})}}>
                업비트
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={e => {this.setState({name: "바이낸스"})}}>
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
      <div style={{display: "inline-block", width: width, height: "50vh", padding: "4px"}}>
          <TradingViewWidget
            symbol="BINANCE:BTCUSDT"
            theme="light"
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
      ? <div className="addchart" style={{
          background: "white",
          width: width,
          height: "50vh",
          color: "black",
          border: "2px solid #e7e7e7",
          outline: "none"
        }}>
        
      </div>
      : <div style={{background: "#FCFCFC"}}>
        
      </div>
    )
  }
}

export default chart;


