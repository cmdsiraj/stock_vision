import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ValuePredictionCard from "../components/ValuePredictionCard";
import RmsImages from "../components/RmsImages";
import TodayStockReadings from "../components/TodayStockReadings";
import ResultFooterImages from "../components/ResultFooterImages";
import Tweets from "../components/Tweets";
import LoadingScreen from "../components/LoadingScreen"
function StockPrediction() {
  const [data, setData] = useState("");
  const [tickerName, setTickerName] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const style_div =
    "p-6 basis-1/2 text-center h-auto border border-gray-200 rounded-lg shadow bg-blue-600 ";
  const style_value = "mb-2 text font-bold tracking-tight text-white";
  const style_text =
    "mb-3 font-sans-italic text-sm md:text-base lg:text-base xl:text-base text-gray-300";

  const getPrediction = (ticker) => {
    setIsLoading(true);
    console.log(ticker);
    fetch(" http://127.0.0.1:5000/get_prediction?ticker=" + ticker)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setVisible(true);
        setIsLoading(false) 
      })
      .catch((e) => alert("Error in fetching data: " + e));
  };

  const searchForPrediction = (ticker) => {
    ticker = ticker.toUpperCase();
    setTickerName(ticker);
    getPrediction(ticker);
    console.log("Button Clicked");
    console.log(ticker);
  };
  return (
    <div className="lg:mx-44 my-6">
      <SearchBar
        placeHolder="Ticker Symbol"
        onClickFunction={searchForPrediction} disabled={isLoading}
      />
      {isLoading ? <LoadingScreen /> : visible && data.length != 0 ? (
        <div>
          <TodayStockReadings data={data.todayData} />
          <>
            <h1 className="font-bold text-2xl px-2 py-3">
              Predictions on {tickerName} stock prices
            </h1>
            <div class="flex flex-row gap-10">
              <div class={style_div}>
              <p class={style_text}>Overall Tweets Polarity</p>
                <h5 class={style_value}>{data.tweets.overallPolarity}</h5>
              </div>
              <div class={style_div}>
                <h5 class={style_value}>
                  According to ML Predictions and Sentiment Analysis of Tweets,
                  a {data.result.idea} in {tickerName} stock is Expected.{" "}
                  {data.result.prediction}ING stock is Recommended.
                </h5>
              </div>
            </div>
          </>
          <RmsImages ticker={tickerName} />
          <ValuePredictionCard
            ticker={tickerName}
            pricePredictions={data.pricePredictions}
            rmse={data.rmse}
          />
          <ResultFooterImages ticker={tickerName} data={data.foreCast} />
          <Tweets ticker={tickerName} tweets={data.tweets.list} />
        </div>
      ) : visible && data.length === 0 ? (
        <h2>Unable to Show Data</h2>
      ) : (
        <></>
      )}

      {}
    </div>
  );
}
export default StockPrediction;
