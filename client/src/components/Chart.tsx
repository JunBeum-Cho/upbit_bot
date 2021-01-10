import React from "react";
import "../App.css";
import Tabs from "./Tabs";
import Alerts from "./Alerts";
import Axios from "axios";
import {
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
} from "reactstrap";
import TradingViewWidget from "react-tradingview-widget";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import AddBox from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import "../chart.css";
import {binance_list, upbit_list} from "../info_list"


class Chart extends React.Component<ChartProps> {
  render() {
    const { chartlist, layout_width, layout_height, theme, interval, indicatorlist } = this.props
    const width = layout_width === "2" ? "48.5vw" : "32vw";
    const height = layout_height === "2" ? "48.5vh" : "99vh";
    
    return (
      chartlist.map((marketname: string) => {
        return  (
          <div key={marketname} className="chart" style={{ width: width, height: height }}>
          <TradingViewWidget
            symbol={marketname}
            theme={theme}
            interval={interval}
            locale="kr"
            autosize
            hide_side_toolbar={false}
            hide_legend={false}
            studies={indicatorlist.map((indicator)=>{return indicator.symbol})}
          />
        </div>
      )
      })
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.login.auth,
  chartlist: state.charts.chartlist,
  layout_width: state.charts.layout_width,
  layout_height: state.charts.layout_height,
  theme: state.charts.theme,
  interval: state.charts.interval,
  indicatorlist: state.charts.indicatorlist,
})

const mapDispatchToProps = (dispatch) => ({
  // addChart: (exchange, coinpair) => dispatch(actions.addChart(exchange, coinpair))
})

type ChartProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
