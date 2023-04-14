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

  const getIndex = async (list, item) => {
    let idx = 0;
    const result = await list.map((item) => {
      if (list.ticker === item) {
        return idx;
      } else {
        idx++;
      }
    });
    return result;
  };

  const addToCharListDataList = (ticker) => {
    ticker = ticker.toUpperCase();
    // console.log(checkIsPresent(tickers, ticker));
    if (tickers.includes(ticker)) {
      console.log(charListData);
      console.log(ticker);
      const idx = charListData.indexOf(ticker);
      console.log(idx);
      const temp = charListData[idx];
      console.log(temp);
      setCharListData((arr) => arr.filter((_, index) => index != idx));
      console.log(charListData);
      setCharListData((arr) => [temp, ...arr]);
      console.log(charListData);
      getAndSetChartData(ticker);
      console.log();
    } else {
      getChartListData([ticker]).then((data) => {
        setCharListData((list) => [data[0], ...list]);
        getAndSetChartData(ticker);
      });
    }
    // console.log("Button Clicked");
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col">
        {stockChartData.length != 0 ? (
          <StockChart data={stockChartData} ticker={chartTicker} />
        ) : (
          <h2>Select to show trends</h2>
        )}
        <div className="m-2">
          <SearchBar
            placeHolder="Ticker Symbol"
            onClickFunction={addToCharListDataList}
          />
        </div>
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
