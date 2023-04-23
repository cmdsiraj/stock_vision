import React, { useState, useEffect } from "react";

function TodayStockReadings({ data }) {
  const text_style1 = "text-2xl font-serif tracking-tight text-white";
  const text_style2 =
    "mb-3 font-sans-italic text-sm md:text-base lg:text-base xl:text-base text-white";
  return (
    <>
      {/* {console.log(data.Close)} */}
      <div>
        <h1 className="font-sans text-2xl px-2 py-3">
          Today's stock data for {data.code}
        </h1>
      </div>
      <div className="px-5 sm: grid-cols-2 lg:px-12 xl:px-12 py-2 grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3">
        <button className="rounded-lg  px-10 py-3  bg-orange-500 flex flex-col hover:cursor-default">
          <p className={text_style1}>{data.Open}</p>
          <p className={text_style2}>Opening price</p>
        </button>
        <button className="rounded-lg  px-10 py-3  bg-indigo-400 flex flex-col hover:cursor-default">
          <p className={text_style1}>{data.High}</p>
          <p className={text_style2}>Highest price</p>
        </button>
        <button className="rounded-lg  px-10 py-3  bg-emerald-400 flex flex-col hover:cursor-default">
          <p className={text_style1}>{data.Low}</p>
          <p className={text_style2}>Lowest price</p>
        </button>
        <button className="rounded-lg  px-10 py-3  bg-pink-500 flex flex-col hover:cursor-default">
          <p className={text_style1}>{data.Close}</p>
          <p className={text_style2}>Closing price</p>
        </button>
        <button className="rounded-lg  px-10 py-3  bg-sky-500 flex flex-col hover:cursor-default">
          <p className={text_style1}>{data.AdjClose}</p>
          <p className={text_style2}>Adj Closing price</p>
        </button>
        <button className="rounded-lg  px-9 py-3  bg-purple-500 flex flex-col hover:cursor-default">
          <p className={text_style1}>{data.Volume}</p>
          <p className={text_style2}>Volume</p>
        </button>
      </div>
    </>
  );
}

export default TodayStockReadings;
