import React from "react";
import "../App.css";
import Tabs from "./Tabs";
import Alerts from "./Alerts";
import Axios from "axios";
import { Button, Label, Badge } from "reactstrap";
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

class Header extends React.Component<HeaderProps> {
  render() {
    return(
    <div className="nav_outerdiv">
        {this.renderRadioBtn()}
        <div className='nav_marketlist'>
          {this.renderList()}
        </div>
    </div>
    )
  }

  renderRadioBtn() {
    return (
      <div className="inlineblock">
        <div className="custom-control custom-radio mb-3">
          <input
            className="custom-control-input"
            defaultChecked
            id="layout33"
            name="layout"
            type="radio"
            onClick={() => {this.props.selectLayout("33")}}
          />
          <label className="custom-control-label" htmlFor="layout33">
            3 X 3
          </label>
        </div>
        <div className="custom-control custom-radio mb-3">
          <input
            className="custom-control-input"
            id="layout22"
            name="layout"
            type="radio"
            onClick={() => {this.props.selectLayout("22")}}
          />
          <label className="custom-control-label" htmlFor="layout22">
            2 X 2
          </label>
        </div>
      </div>
    )
  }
  renderList() {
    return this.props.chartlist.map((marketname) => {
      return (
        <Button
          key={marketname}
          className="btn-icon btn-3" 
          size="sm" 
          color="secondary" 
          type="button" 
          onClick={()=> {
            this.props.deleteChart(marketname)
          }}
        >
          <span className="btn-inner--icon">
            <i className="fa fa-times" />
          </span>
          <span className="btn-inner--text">{marketname}</span>
        </Button>
      )
    })
  }

}

const mapStateToProps = (state) => ({
    auth: state.login.auth,
    chartlist: state.charts.chartlist,
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
    selectIndicator: (indicator) => dispatch(actions.selectIndicator(indicator)),
    deleteChart: (chart) => dispatch(actions.deleteChart(chart))
})

type HeaderProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
  
export default connect(mapStateToProps, mapDispatchToProps)(Header)