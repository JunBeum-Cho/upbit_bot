import React from "react";
import "../App.css";
import Tabs from "./Tabs";
import Alerts from "./Alerts";
import Axios from "axios";
import { Button } from "reactstrap";
import TradingViewWidget from "react-tradingview-widget";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import AddBox from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import binance_json from "../binance_list.json";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import "../chart.css";

//https://www.binance.com/api/v1/ticker/allPrices
// interface AddChartProps {
//     auth: boolean,
//     layout: string,
//     addChart: () =>
// }

class AddChart extends React.Component<AddChartProps> {
  state = {
    exchange: "binance",
    coinpair: "",
    editing: false
  };

  render() {
    const width = this.props.layout === "22" ? "49vw" : "32vw";
    return this.state.editing 
    ? (
      <div className="chart" style={{ width: width, height: "49vh" }}>
        <div className="addchart">
          <div style={{ display: "table-cell", verticalAlign: "middle", textAlign: "center", }}>
            {this.renderRadiobtn()}
            <div style={{ textAlign: "center", marginTop: "-6px", marginBottom: "60px" }}>
              {this.renderAutoComplete()}
              {this.renderAddButton()}
              {this.renderRemoveButton()}
            </div>
          </div>
        </div>
      </div>
      ) 
    : (
      <div className="chart" style={{ width: width, height: "49vh" }}>
        <div className="addchart editing"
          onClick={() => {
            this.setState({ editing: !this.state.editing });
          }}>
        <i className="fa fa-plus addchartimg"></i>
        </div>
      </div>
    )
  }

  renderAddButton() {
    return (
      <IconButton
        style={{ marginLeft: "10px", verticalAlign: "bottom", outline: "none" }}
        aria-label="add"
        onClick={() => {
          this.props.addChart(this.state.exchange, this.state.coinpair)
          this.setState({...this.state, editing: !this.state.editing})
        }}
      >
        <AddBox />
      </IconButton>
    );
  }

  renderRemoveButton() {
    return (
      <IconButton
        style={{ verticalAlign: "bottom", outline: "none" }}
        aria-label="delete"
        onClick={() => {
          this.setState({ ...this.state, exchange: "binance", coinpair: "", editing: !this.state.editing });
        }}
      >
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
        style={{ width: "180px", display: "inline-block" }}
        options={binance_list}
        getOptionLabel={(option) => `${option}`}
        id="coinList"
        selectOnFocus
        onChange={(event, value) => {
          this.setState({...this.state, coinpair: value})
        }}
        renderInput={(params) => (
          <TextField {...params} label={"코인명"} margin="normal" />
        )}
      />
    );
  }

  renderRadiobtn() {
    return (
      <div className="inlineblock">
        <div className="custom-control custom-radio mb-3 inlineblock">
          <input
            className="custom-control-input"
            defaultChecked
            id="exchangeBtn1"
            name="exchange"
            type="radio"
            onClick={()=>{this.setState({...this.state, exchange: "binance"})}}
          />
          <label className="custom-control-label" htmlFor="exchangeBtn1">
            바이낸스 {/* 3 X 3 */}
          </label>
        </div>
        <div
          style={{ marginLeft: "40px" }}
          className="custom-control custom-radio mb-3 inlineblock"
        >
          <input
            className="custom-control-input"
            id="exchangeBtn2"
            name="exchange"
            type="radio"
            onClick={()=>{this.setState({...this.state, exchange: "upbit"})}}
          />
          <label className="custom-control-label" htmlFor="exchangeBtn2">
            업비트 {/* 2 X 2 */}
          </label>
        </div>
      </div>
    );
  }

  // renderDropdown() {
  //   return (
  //     <div className="dropdown">
  //       <UncontrolledDropdown group>
  //         <DropdownToggle caret color="secondary">
  //           {this.state.exchange}
  //         </DropdownToggle>
  //         <DropdownMenu>
  //           <DropdownItem
  //             style={{ outline: "none" }}
  //             onClick={(e) => this.setState({ exchange: "업비트" })}
  //           >
  //             업비트
  //           </DropdownItem>
  //           <DropdownItem
  //             style={{ outline: "none" }}
  //             onClick={(e) => this.setState({ exchange: "바이낸스" })}
  //           >
  //             바이낸스
  //           </DropdownItem>
  //         </DropdownMenu>
  //       </UncontrolledDropdown>
  //     </div>
  //   )
  // }

}

const mapStateToProps = (state) => ({
  auth: state.login.auth,
  layout: state.charts.layout,
})

const mapDispatchToProps = (dispatch) => ({
  addChart: (exchange, coinpair) =>
    dispatch(actions.addChart(exchange, coinpair))
})

type AddChartProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(AddChart);
