import React, { useState } from "react";
import StockChart from "../components/StockChart";

function Home() {
  const [visible, setVisible] = useState(false);
  const [stockData, setStockData] = useState([]);

  const get_data = () => {
    if (!visible) {
      setStockData([]);
      fetch(" http://127.0.0.1:5000/get_stock_data")
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
      {visible && stockData.length != 0 ? (
        <StockChart data={stockData} />
      ) : visible && stockData.length === 0 ? (
        <h2>Unable to Show Data</h2>
      ) : (
        <>Click to show</>
      )}
    </>
  );
}

export default Home;
