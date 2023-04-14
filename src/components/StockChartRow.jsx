import React, { useState } from "react";

function StockChartRow({ data, onClickFunction, sign }) {
  let changeClass = "flex flex-col pe-4 ";
  return (
    <>
      <div
        className="flex flex-row border-solid border-2 p-1 items-center bg-gray-700 text-white text-sm hover:bg-gray-800 active:bg-gray-900 hover:cursor-pointer active:cursor-wait transform hover:scale-105"
        onClick={onClickFunction}
      >
        <span className="flex-auto ps-4">{data.ticker}</span>
        <span className="flex-auto">{data.curr}</span>

        <span
          className={
            data.change >= 0
              ? changeClass + "text-green-600"
              : changeClass + "text-red-600"
          }
        >
          <p>
            {sign}
            {data.change}
          </p>
          <p>
            {sign}
            {data.p_change}%
          </p>
        </span>
      </div>
    </>
  );
}

export default StockChartRow;
