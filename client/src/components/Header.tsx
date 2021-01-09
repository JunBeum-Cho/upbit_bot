import React from "react";
import "../App.css";
import Tabs from "./Tabs";
import Alerts from "./Alerts";
import Axios from "axios";
import { Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import TradingViewWidget from "react-tradingview-widget";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import AddBox from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import binance_json from "../binance_list.json";
import { connect } from 'react-redux';
import { indicator_list } from "../info_list"
import * as actions from "../redux/actions"
import "../chart.css";

class Header extends React.Component<HeaderProps> {
  render() {
    return(
    <div className="nav_outerdiv">
        <div className='nav_radioBtn'>
            {this.renderRadioBtn()}
        </div>
        <div className = "nav_list">
            <div className='nav_marketlist'>
            {this.renderMarketList()}
            </div>
            <div style={{width: "inherit", height: "20px", borderBottom: "1px solid #BDBDBD"}}/>
            <div className='nav_indicatorlist'>
            {this.renderDropdown()}
            {this.renderIndicatorList()}
            </div>
        </div>
    </div>
    )
  }

  renderRadioBtn() {
    return (
      <>
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
      </>
    )
  }
  renderMarketList() {
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

    renderDropdown() {
    return (
        <div className="dropdown">
        <UncontrolledDropdown size="md" group>
            <DropdownToggle caret color="primary">
            지표 추가
            </DropdownToggle>
            <DropdownMenu style={{maxHeight: "500px", overflowY: "scroll"}}>
            {indicator_list.map((indicator) => {
                return (
                    <DropdownItem
                        key={indicator.name}
                        style={{ outline: "none" }}
                        onClick={(e) => this.props.addIndicator(indicator)}
                        >
                        {indicator.name}
                    </DropdownItem>
                )
            })}
            </DropdownMenu>
        </UncontrolledDropdown>
        </div>
    )
    }

    renderIndicatorList() {
        return this.props.indicatorlist.map((indicator) => {
            return (
              <Button
                key={indicator.name}
                className="btn-icon btn-3" 
                size="sm" 
                color="secondary" 
                type="button" 
                onClick={()=> {
                  this.props.deleteIndicator(indicator)
                }}
              >
                <span className="btn-inner--icon">
                  <i className="fa fa-times" />
                </span>
                <span className="btn-inner--text">{indicator.name}</span>
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
    indicatorlist: state.charts.indicatorlist
})

const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(actions.login()),
    logout: () => dispatch(actions.logout()),
    selectLayout: (layout) => dispatch(actions.selectLayout(layout)),
    selectTheme: (theme) => dispatch(actions.selectTheme(theme)),
    selectInterval: (interval) => dispatch(actions.selectInterval(interval)),
    addIndicator: (indicator) => dispatch(actions.addIndicator(indicator)),
    deleteChart: (chart) => dispatch(actions.deleteChart(chart)),
    deleteIndicator: (indicator) => dispatch(actions.deleteIndicator(indicator))
})

type HeaderProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
  
export default connect(mapStateToProps, mapDispatchToProps)(Header)