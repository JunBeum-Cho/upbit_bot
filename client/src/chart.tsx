import React from 'react';
import './App.css';
import Tabs from "./components/Tabs"
import Alerts from "./components/Alerts"
import Axios from "axios"
import { Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

class chart extends React.Component {

  state = {
    name: "거래소",
    layout: 33
  }
  async componentDidMount() {

  }

  render() {
    return (
      <div>
        <div style={{display: "inline-block"}}>
          {this.renderRadiobtn()}
          {this.renderDropdown()}
        </div>
        <div style={{display: "block"}}>
          {this.renderChart()}
        </div>
      </div>
    )
  }

  renderRadiobtn() {
    return (
      <>
        <div className="custom-control custom-radio mb-3">
          <input
            className="custom-control-input"
            id="customRadio5"
            name="custom-radio-2"
            type="radio"
          />
          <label className="custom-control-label" htmlFor="customRadio5">
            바이낸스
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
            업비트
          </label>
        </div>
      </>
    )
  }

  renderDropdown() {
    return (
      <div>
        <UncontrolledDropdown group>
            <DropdownToggle caret color="secondary">
              {this.state.name}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="#pablo" onClick={e => this.setState({"name": "업비트"})}>
                업비트
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={e => this.setState({"name": "바이낸스"})}>
                바이낸스
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
    )
  }

  renderChart() {
    return(
      <div style={{display: "inline-block", width: "33vw", height: "50vh", padding: "4px"}}>
        <TradingViewWidget
          symbol="BINANCE:BTCUSDT"
          theme={Themes.Light}
          interval="5"
          locale="kr"
          autosize
        />
      </div>
    )
  }
}

export default chart;
