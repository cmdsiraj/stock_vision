import React, { useState } from "react";

function StockChartColumn({ data, onClickFunction, sign }) {
  let changeClass = "flex flex-col pe-4 ";
  return (
    <>
      <div
        className="flex flex-row border-b items-center bg-gray-900 text-white text-sm"
        onClick={onClickFunction}
      >
        <span className="flex-auto font-medium text-gray-900 whitespace dark:text-white ps-4">{data.ticker}</span>
        <span className="flex-auto text-sm text-slate-400">{data.curr}</span>

        <span
          className={
            data.change >= 0
              ? changeClass + "text-green-600"
              : changeClass + "text-red-600"
          }
        >
          <p>{data.change}</p>
          <p>{data.p_change}%</p>
        </span>
      </div>
    </>
  );
}

export default StockChartColumn;
