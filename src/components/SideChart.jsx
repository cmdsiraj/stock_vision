import React, { useState, useEffect } from "react";
import StockChart from "../components/StockChart";
import StockChartRow from "./StockChartRow";
import SearchBar from "./SearchBar";

const SideChart = () => {
  // const [visible, setVisible] = useState(false);
  const [stockChartData, setStockChartData] = useState([]);
  const [chartListData, setChartListData] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const [chartTicker, setChartTicker] = useState("");
  // const [tempCharListData, setTempCharListData] = useState([]);

  let tickers = ["AAPL", "GOOG", "AMZN", "TSLA", "MSFT", "META"];

  useEffect(() => {
    if (loadData) {
      setLoadData(false);
      getChartListData(tickers).then((data) => {
        setChartListData(data);
        getAndSetChartData(data[0].ticker);
      });
      // setCharListData(data);
      // getAndSetChartData(data[0].ticker);
    }
    // console.log("I called twice");
  }, [tickers]);

  const getChartListData = async (tickers) => {
    let data = await fetch(
      " http://127.0.0.1:5000/get_today_data?tickers=" + tickers
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((e) => alert("Error in Loading data: " + e));
    return data;
  };

  const getAndSetChartData = (ticker = "GOOG") => {
    // setStockData([]);
    fetch(" http://127.0.0.1:5000/get_stock_data?ticker=" + ticker)
      .then((res) => res.json())
      .then((data) => {
        setStockChartData(data);
        setChartTicker(ticker);
      })
      .catch((e) => alert("Error in fetching data: " + e));
  };

  function moveObjectToFront(key, value, array) {
    const index = array.findIndex((item) => item[key] === value);
    if (index > -1) {
      const [itemToMove] = array.splice(index, 1);
      array.unshift(itemToMove);
      return array;
    } else {
      return -1;
    }
  }

  const addToChartListDataList = (ticker) => {
    ticker = ticker.toUpperCase();
    const newItems = moveObjectToFront("ticker", ticker, chartListData);
    if (newItems != -1) {
      const newItems = moveObjectToFront("ticker", ticker, chartListData);
      setChartListData(newItems);
      getAndSetChartData(ticker);
      console.log(chartListData);
    } else {
      getChartListData([ticker]).then((data) => {
        setChartListData((prevArr) => {
          const newArr = [...prevArr];
          newArr.pop();
          return newArr;
        });
        setChartListData((arr) => [data[0], ...arr]);
        getAndSetChartData(ticker);
      });
    }
    // console.log("Button Clicked");
  };

  return (
    <div className="w-full h-full pr-1">
      <div className="m-2">
        <SearchBar
          placeHolder="Ticker Symbol"
          onClickFunction={addToChartListDataList}
        />
      </div>
      <div className="flex flex-col">
        {stockChartData.length != 0 ? (
          <StockChart data={stockChartData} ticker={chartTicker} />
        ) : (
          <h2>Select to show trends</h2>
        )}

        <div className="overflow-y-auto h-1/6">
          {chartListData.map((data) => (
            <StockChartRow
              data={data}
              sign={data.change >= 0 ? "+" : ""}
              onClickFunction={() => getAndSetChartData(data.ticker)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideChart;
