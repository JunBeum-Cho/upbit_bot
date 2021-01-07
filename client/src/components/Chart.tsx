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
import { connect } from 'react-redux';
import "./chart.css"

interface ChartProps {
  auth: boolean,
  layout: string,
  theme: string,
  interval: string,
  indicators: string[]
}

//https://www.binance.com/api/v1/ticker/allPrices
class Chart extends React.Component<ChartProps> {

  render() {
      return (
        <div className="chart_outerdiv">
          {this.renderChart()}
        </div>
      )
    }

    renderChart() {
        const width = this.props.layout === "22" ? "49vw" : "32vw"
        return (
          <div className="chart" style={{width:width, height:"49vh"}}>
              <TradingViewWidget
                symbol="BINANCE:BTCUSDT"
                theme="Light"
                interval="5"
                locale="kr"
                autosize
                studies= {this.props.indicators}
              />
          </div>
        )
      }
}

const mapStateToProps = (state) => ({
  auth: state.login.auth,
  layout: state.charts.layout,
  theme: state.charts.theme,
  interval: state.charts.interval,
  indicators: state.charts.indicators
})

const mapDispatchToProps = (dispatch) => ({
  // addChart: (exchange, coinpair) => dispatch(actions.addChart(exchange, coinpair))
})

export default connect(mapStateToProps, mapDispatchToProps)(Chart)