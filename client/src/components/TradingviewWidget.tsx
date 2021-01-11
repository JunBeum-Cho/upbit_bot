import React from "react";
import TradingViewWidget from "react-tradingview-widget";

type Tradingview_Widget_Props = {
    marketname: string
    width: string
    height: string
    theme: string
    interval: string
    indicatorlist: string[]
  };
  
export const Tradingview_Widget = React.memo<Tradingview_Widget_Props>(({marketname, width, height, theme, interval, indicatorlist}) => {
    return (<div key={marketname} className="chart" style={{ width: width, height: height }}>
      <TradingViewWidget
        symbol={marketname}
        theme={theme}
        interval={interval}
        locale="kr"
        autosize
        hide_side_toolbar={false}
        hide_legend={false}
        studies={indicatorlist.map((indicator)=>{return indicator["symbol"]})}
      />
    </div>)
  });