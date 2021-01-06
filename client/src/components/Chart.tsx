import React from 'react';
import './App.css';
import Tabs from "./Tabs"
import Alerts from "./Alerts"
import Axios from "axios"
import { Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Label } from "reactstrap";
import TradingViewWidget from 'react-tradingview-widget';
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from '@material-ui/core/IconButton';
import AddBox from "@material-ui/icons/AddBox"
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";
import binance_json from "../binance_list.json"
import "./chart.css"

//https://www.binance.com/api/v1/ticker/allPrices
class Chart extends React.Component {

  render() {
      return (
        <div className="chart_outerdiv">
          {this.renderChart()}
        </div>
      )
    }

    renderChart() {
        const width = this.state.layout === 22 ? "49vw" : "32vw"
        return (
          <div className="chart" style={{width:width, height:"49vh"}}>
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
        const width = this.state.layout === 22 ? "49vw" : "32vw"
        return(
          this.state.editing
          ? <div className= "chart" style={{width: width, height: "49vh"}}>
              
            </div>
          : <div className= "chart" style={{width: width, height: "49vh"}}>
              <div className="addchart editing" onClick={()=>{this.setState({editing: !this.state.editing})}}>
                <i className="fa fa-plus addchartimg"></i>
              </div>
            </div>
        )
      }
}

export default Chart