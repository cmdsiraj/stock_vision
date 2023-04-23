import React, { useState, useEffect } from "react";
import StockChart from "../components/StockChart";
import StockChartRow from "./StockChartRow";
import SearchBar from "./SearchBar";

const SideChart = () => {
  // const [visible, setVisible] = useState(false);
  const [stockChartData, setStockChartData] = useState([]);
  const [charListData, setCharListData] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [chartTicker, setChartTicker] = useState("");
  // const [tempCharListData, setTempCharListData] = useState([]);

  let tickers = ["AAPL", "GOOG", "AMZN", "TSLA", "MSFT", "META"];

  useEffect(() => {
    if (!loadData) {
      getChartListData(tickers).then((data) => {
        setCharListData(data);
        getAndSetChartData(data[0].ticker);
      });
      // setCharListData(data);
      // getAndSetChartData(data[0].ticker);
      setLoadData(!loadData);
    }
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

  const checkIsPresent = (list, item) => {
    list.map((data) => {
      if (data === item) return true;
      else return false;
    });
  };

  const addToCharListDataList = (ticker) => {
    ticker = ticker.toUpperCase();
    if (checkIsPresent(tickers, ticker)) {
      getAndSetChartData(ticker);
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
      <div className="flex flex-col">
        {stockChartData.length != 0 ? (
          <>
          <StockChart data={stockChartData} ticker={chartTicker} />
          <div className="m-2">
          <SearchBar
            placeHolder="Ticker Symbol"
            onClickFunction={addToCharListDataList}
          />
        </div>
        </>
        ) : (
<></>        )}

        <div className="overflow-y-auto h-1/6">
          {charListData.map((data) => (
            <StockChartRow
              key={data.ticker}
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
