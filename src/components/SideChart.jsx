import React, { useState, useEffect } from "react";
import StockChart from "../components/StockChart";

const SideChart = () => {
  const [visible, setVisible] = useState(false);
  const [stockData, setStockData] = useState([]);
  const [todayData, setTodayStockData] = useState([]);

  let tickers = ["AAPL", "GOOG", "AMZN", "HDFCBANK", "TATAMOTORS", "ICICIBANK"];

  useEffect(() => {
    const get_today = () => {
      fetch(" http://127.0.0.1:5000/get_today_data?tickers=" + tickers)
        .then((res) => res.json())
        .then((data) => {
          setTodayStockData(data);
        });
    };
  }, [tickers]);

  const get_data = () => {
    if (!visible) {
      setStockData([]);
      let ticker = "GOOG";
      fetch(" http://127.0.0.1:5000/get_stock_data?ticker=" + ticker)
        .then((res) => res.json())
        .then((data) => {
          setStockData(data);
        });
    }
    setVisible(!visible);
  };

  return (
    <>
      <button onClick={() => get_data()}>Show Chart</button>
      <button onClick={() => get_today()}>Today</button>
      {visible && stockData.length != 0 ? (
        <StockChart data={stockData} />
      ) : visible && stockData.length === 0 ? (
        <h2>Unable to Show Data</h2>
      ) : (
        <>Click to show!!</>
      )}
    </>
  );
};

export default SideChart;
