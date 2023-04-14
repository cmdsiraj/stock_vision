import React, { useState, useEffect } from "react";
import StockChart from "../components/StockChart";
import StockChartRow from "./StockChartRow";
import SearchBar from "./SearchBar";

const SideChart = () => {
  // const [visible, setVisible] = useState(false);
  const [stockChartData, setStockChartData] = useState([]);
  const [charListData, setCharListData] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const [chartTicker, setChartTicker] = useState("");
  // const [tempCharListData, setTempCharListData] = useState([]);

  let tickers = ["AAPL", "GOOG", "AMZN", "TSLA", "MSFT", "META"];

  useEffect(() => {
    if (loadData) {
      setLoadData(false);
      getChartListData(tickers).then((data) => {
        setCharListData(data);
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

  function getTickerObject(array, key, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return { object: array[i], index: i };
      }
    }
    return null;
  }

  const addToCharListDataList = (ticker) => {
    ticker = ticker.toUpperCase();
    if (tickers.includes(ticker)) {
      const { obj, idx } = getTickerObject(charListData, "ticker", ticker);
      setCharListData((arr) => arr.filter((_, index) => index != idx));
      setCharListData((arr) => [obj, ...arr]);
      getAndSetChartData(ticker);
      const tkrIdx = ticker.indexOf(ticker);
      tickers.splice(tkrIdx, 1);
      tickers.splice(0,0,ticker)
    } else {
      getChartListData([ticker]).then((data) => {
        setCharListData((list) => [data[0], ...list]);
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
          onClickFunction={addToCharListDataList}
        />
      </div>
      <div className="flex flex-col">
        {stockChartData.length != 0 ? (
          <StockChart data={stockChartData} ticker={chartTicker} />
        ) : (
          <h2>Select to show trends</h2>
        )}

        <div className="overflow-y-auto h-1/6">
          {charListData.map((data) => (
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
