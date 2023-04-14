import React from "react";
import SideChart from "../components/SideChart";
import StockTable from "../components/stockTable";
import Converter from "../components/converter";
import banner from "../images/banner.jpg";
import StockPrediction from "./StockPrediction";
function Home() {
  return (
    <>
      <div className="relative">
        <img
          src={banner}
          alt="Stock-Vision"
          className="2xl:basis-1/3 xl:basis-1/3 lg:basis-1/3 md:basis-1/3 basis-full:sm-basis-left h-auto"
        />
        <div className=" backdrop-blur-sm absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white  font-mono-bold tracking-wide mb-4 2xl:text-9xl xl:text-7xl lg:text-7xl md:text-7xl sm:text-7xl">
            STOCK VISION
          </h1>
          <h2 className="text-white  font-mono-bold tracking-wide mb-4 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl ">
            The future of stock market
          </h2>
          <h2 className="text-white  font-mono-bold tracking-wide mb-4 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl ">
            Predict future prices, live stock prices
          </h2>
        </div>
      </div>
      <div className="flex xl:flex-row lg:flex-row md:flex-row flex-col sm:flex-left">
        <div className="2xl:basis-2/3 xl:basis-2/3 lg:basis-2/3 md:basis-1/3 overflow-scroll sm:overflow-left">
          <StockTable />
        </div>
        <div className="2xl:basis-1/3 xl:basis-1/3 lg:basis-1/3 md:basis-1/3 basis-full:sm-basis-left">
          <SideChart />
        </div>
      </div>
      {/* <StockPrediction /> */}
    </>
  );
}

export default Home;
