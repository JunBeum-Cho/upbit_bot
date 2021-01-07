import React from "react";
import "../App.css";
import Tabs from "./Tabs";
import Alerts from "./Alerts";
import Axios from "axios";
import { Button, Label } from "reactstrap";
import TradingViewWidget from "react-tradingview-widget";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import AddBox from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import binance_json from "../binance_list.json";
import { connect } from 'react-redux';
import * as actions from "../redux/actions"
import "../chart.css";

// interface HeaderProps {
//     auth: boolean,
//     chartlist: string[],
//     layout: string,
//     theme: string,
//     interval: string,
//     indicators: string[],
//     login: () => void,
//     logout: () => void,
//     selectLayout: (layout) => void
//     selectTheme: (theme) => void,
//     selectInterval: (interval) => void,
//     selectIndicator: (indicator) => void
// }

class Header extends React.Component<HeaderProps> {
  render() {
    return(
    <div className="nav_outerdiv">
        {this.renderRadioBtn()}
    </div>
    )
  }

  renderRadioBtn() {
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

}

const mapStateToProps = (state) => ({
    auth: state.login.auth,
    chartlist: state.charts.chartlists,
    layout: state.charts.layout,
    theme: state.charts.theme,
    interval: state.charts.interval,
    indicators: state.charts.indicators
})

const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(actions.login()),
    logout: () => dispatch(actions.logout()),
    selectLayout: (layout) => dispatch(actions.selectLayout(layout)),
    selectTheme: (theme) => dispatch(actions.selectTheme(theme)),
    selectInterval: (interval) => dispatch(actions.selectInterval(interval)),
    selectIndicator: (indicator) => dispatch(actions.selectIndicator(indicator))
})

type HeaderProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
  
export default connect(mapStateToProps, mapDispatchToProps)(Header)