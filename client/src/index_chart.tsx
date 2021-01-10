import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer"
import Chart from "./components/Chart";
import AddChart from "./components/AddChart";
import "./chart.css";

class IndexChart extends React.Component {
  async componentDidMount() {
    // const binance_list = await (await Axios.get("https://www.binance.com/api/v1/ticker/allPrices")).data
  }

  render() {
    return (
      <div>
        <Header />
        <div className="chart_outerdiv">
          <Chart/>
          <AddChart />
        </div>
        <Footer />
      </div>
    )
  }
}

export default IndexChart;
