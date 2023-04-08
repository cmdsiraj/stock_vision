import React, { useState, useEffect } from "react";
import StockChart from "../components/StockChart";
import StockChartColumn from "./StockChartRow";

const SideChart = () => {
  const [visible, setVisible] = useState(false);
  const [stockData, setStockData] = useState([]);
  const [todayData, setTodayStockData] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const [chartTicker, setChartTicker] = useState("");

  let tickers = ["AAPL", "GOOG", "AMZN", "TSLA", "MSFT", "META"];

  useEffect(() => {
    if (loadData) {
      setTodayStockData([]);
      fetch(" http://127.0.0.1:5000/get_today_data?tickers=" + tickers)
        .then((res) => res.json())
        .then((data) => {
          setTodayStockData(data);
          // get_data(todayData[0].ticker);
          console.log(todayData);
          setVisible(true);
          // console.log(todayData);
          // alert("data loaded");
        })
        .catch((e) => alert("Error in Loading data: " + e));
      setLoadData(false);
    }
  }, [tickers]);

  const get_data = (ticker = "GOOG") => {
    // setStockData([]);
    fetch(" http://127.0.0.1:5000/get_stock_data?ticker=" + ticker)
      .then((res) => res.json())
      .then((data) => {
        setStockData(data);
        setChartTicker(ticker);
      });
  };

  return (
    <>
      <div className="grid">
        <div className="flex-1">
          {stockData.length != 0 ? (
            <StockChart data={stockData} ticker={chartTicker} />
          ) : (
            <h2>Unable to Show Data</h2>
          )}
        </div>
        <div className="">
          {todayData.map((data) => (
            <StockChartColumn
              data={data}
              sign={data.change >= 0 ? "+" : "-"}
              onClickFunction={() => get_data(data.ticker)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SideChart;
