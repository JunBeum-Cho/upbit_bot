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

class AddChart extends React.Component {

    state = {
        exchange: "바이낸스",
        editing: false
    }

    render() {
        return (
        <div className="addchart">
          <div style={{display:"table-cell", verticalAlign:"middle", textAlign: "center"}}>
              {this.renderRadiobtn()}
              <div style={{textAlign: "center", marginTop:"-6px", marginBottom: "60px"}}>
              {this.renderAutoComplete()}
              {this.renderAddButton()}
              {this.renderRemoveButton()}
              </div>
          </div>
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

      renderAddButton() { 
        return(
          <IconButton
            style={{marginLeft: "10px", verticalAlign: "bottom", outline: "none"}} 
            aria-label="add" 
            onClick={()=>{}}>
            <AddBox />
          </IconButton>
          )
        }

    renderRemoveButton() { 
        return(
            <IconButton
            style={{verticalAlign: "bottom", outline: "none"}} 
            aria-label="delete" 
            onClick={()=>{this.setState({editing: !this.state.editing})}}>
            <DeleteIcon />
            </IconButton>
            )
        }

        renderAutoComplete() {
            // let binance_list = binance_json.map(item=> item.symbol) 속도가 느려서 대체
            let binance_list: string[] = []
            for (let coin of binance_json) {
              binance_list.push(coin.symbol)
            }
            return (
              <Autocomplete
                  style={{width: "180px", display: "inline-block"}}
                  options={binance_list}
                  getOptionLabel={(option) => `${option}`}
                  id="coinList"
                  selectOnFocus
                  onChange = {(event, value)=>{
                    console.log(value)
                  }}
                  renderInput={(params) => <TextField {...params} label={"코인명"} margin="normal" />}
                />
            )
          }

          renderRadiobtn() {
            return (
              <div className="inlineblock">
                <div className="custom-control custom-radio mb-3 inlineblock">
                  <input
                    className="custom-control-input"
                    id="customRadio5"
                    name="custom-radio-2"
                    type="radio"
                  />
                  <label className="custom-control-label" htmlFor="customRadio5">
                    업비트 {/* 3 X 3 */}
                  </label>
                </div>
                <div style={{marginLeft: "40px"}}className="custom-control custom-radio mb-3 inlineblock">
                  <input
                    className="custom-control-input"
                    defaultChecked
                    id="customRadio6"
                    name="custom-radio-2"
                    type="radio"
                  />
                  <label className="custom-control-label" htmlFor="customRadio6">
                    바이낸스 {/* 2 X 2 */}
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
                <DropdownItem style={{outline: "none"}} onClick={e => this.setState({exchange: "업비트"})}>
                    업비트
                </DropdownItem>
                <DropdownItem style={{outline: "none"}} onClick={e => this.setState({exchange: "바이낸스"})}>
                    바이낸스
                </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            </div>
    )
  }

}

export default AddChart