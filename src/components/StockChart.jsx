import React, { useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const StockChart = ({ data, ticker }) => {
  useEffect(() => {
    const options = {
      chart: {
        type: "line",
        backgroundColor: "rgb(15 23 42)",
      },
      title: {
        text: ticker,
        style:{
          color: "rgb(255 255 255)",
          fontWeight: "bold"
        },
      },
      xAxis: {
        type: "datetime",
      },
      yAxis: {
        title: {
          text: "Price",
        },
      },
      series: [
        {
          name: "Stock Price",
          data: data.map((d) => [new Date(d.date).getTime(), d.price]),
        },
      ],
    };

    const chart = Highcharts.stockChart("stock-chart", options);
    return () => {
      chart.destroy();
    };
  }, [data]);

  return <div id="stock-chart" />;
};

export default StockChart;
