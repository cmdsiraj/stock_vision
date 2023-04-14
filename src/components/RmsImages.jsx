import React, { useState } from "react";
import ImageCard from "./ImageCard";
import Arima from "../temp/ARIMA.png";
import LR from "../temp/LR.png";
import LSTM from "../temp/LSTM.png";
import Trends from "../temp/Trends.png";

function RmsImages({ ticker }) {
  return (
    <div className="grid grid-cols-2">
      <ImageCard
        src={Trends}
        caption={"RECENT TRENDS IN " + ticker + " STOCK PRICES"}
      />
      <ImageCard src={Arima} caption={"ARIMA MODEL ACCURACY"} />
      <ImageCard src={LSTM} caption={"LSTM MODEL ACCURACY"} />
      <ImageCard src={LR} caption={"LINEAR REGRESSION MODEL ACCURACY"} />
    </div>
  );
}

export default RmsImages;
