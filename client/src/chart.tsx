import React from 'react';
import './App.css';
import Tabs from "./components/Tabs"
import Alerts from "./components/Alerts"
import Axios from "axios"
import { Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Label } from "reactstrap";
import TradingViewWidget from 'react-tradingview-widget';
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";
import binance_json from "./binance_list.json"
import "./chart.css"

//https://www.binance.com/api/v1/ticker/allPrices
class chart extends React.Component {

  state = {
    exchange: "거래소",
    editing: false,
    layout: 33,
    theme: "light",
    interval: 5,
    indicators: [
      "LinearRegression@tv-basicstudies",
      "RSI@tv-basicstudies",
      "MASimple@tv-basicstudies"
    ]
  }

  async componentDidMount() {
    // const binance_list = await (await Axios.get("https://www.binance.com/api/v1/ticker/allPrices")).data
  }

  render() {
    console.log("!@#$!@#")
    return (
      <div>
        <div className="nav_outerdiv">
          {this.renderRadiobtn()}
        </div>
        <div className="chart_outerdiv">
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
          <div className="addchart">
            {this.renderAutoComplete()}
            {this.renderRemoveButton()}
            {this.renderDropdown()}
          </div>
        </div>
      : <div className= "chart" style={{width: width, height: "49vh"}}>
          <div className="addchart editing" onClick={()=>{this.setState({editing: !this.state.editing})}}>
            <i className="fa fa-plus addchartimg"></i>
          </div>
        </div>
    )
  }


//   renderadditem() {
//     const allCourseList = allCourseList_json.courses
//     if (this.state.editing === true) {
//         return (
//             <tr>
//                 <td colSpan={7}>
//                     <AutocompleteCoursesTextField
//                         list={allCourseList} 
//                         handleCancel={() => {this.setState({editing: false})}} 
//                         handleCreate={this.handleCreate}>
//                     </AutocompleteCoursesTextField></td>
//             </tr>
//         )
//     } else {
//         return (
//             <tr>
//                 <td colSpan={8}>
//                     <div 
//                         className="additem_btn" 
//                         onClick={() => {this.setState({editing: !this.state.editing})}}>+
//                     </div>
//                 </td>
//             </tr>
//         )
//     }
// }

renderRemoveButton() { 
  return(
    <IconButton
      style={{marginLeft: "10px", verticalAlign: "bottom", marginBottom: "5px", outline: "none"}} 
      aria-label="delete" 
      onClick={()=>{}}>
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
          onChange = {(event, value)=>{console.log(value)}}
          renderInput={(params) => <TextField {...params} label={"코인명"} margin="normal" />}
        />
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

export default chart;


