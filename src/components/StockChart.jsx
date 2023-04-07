import React, { useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const StockChart = ({ data }) => {
  useEffect(() => {
    // Highcharts options object
    const options = {
      chart: {
        type: "line",
      },
      title: {
        text: "Stock Price Chart",
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

    // Create the chart
    const chart = Highcharts.stockChart("stock-chart", options);

    // Clean up the chart when the component unmounts
    return () => {
      chart.destroy();
    };
  }, [data]);

  return <div id="stock-chart" />;
};

export default StockChart;
