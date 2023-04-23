import React, { useState, useEffect } from "react";
import StockRow from "./StockRow";

function create_row(stock) {
  // console.log("creat_row");
  return (
    <StockRow
      key={stock.name}
      name={stock.name}
      value={stock.value}
      open={stock.open}
      high={stock.high}
      low={stock.low}
      prev={stock.prev}
    />
  );
}

function StockTable() {

  const [stockData, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!visible) {
      fetch(" http://127.0.0.1:5000/get_table_display_data")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setData(data);
        });
      setVisible(!visible);
    }
  }, [stockData]);
  //  function get_data() {
  //   }
  const th_style=" text-left 2xl:10 xl:px-8 lg:px-6 md:px-7 sm:px-7 py-3"
  return (
    <span className="flex items-stretch pl-1 pt-1 pr-1  relative w-fit overflow-auto shadow-md">
      {visible && stockData.length != 0 ? (
        <table className="overflow-auto text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="2xl:20 xl:px-16  lg:px-16 md:px-12 sm:px-10 px-10 sm:px-left py-3 "
              >
                Name
              </th>
              <th
                scope="col"
                className="2xl:10 xl:px-12 lg:px-9 md:px-7 sm:px-7 py-3"
              >
                Value
              </th>
              <th
                scope="col"
                className="2xl:10 xl:px-9 lg:px-8 md:px-7 sm:px-7 py-3"
              >
                Change
              </th>
              <th
                scope="col"
                className="2xl:10 xl:px-9 lg:px-8 md:px-7 sm:px-7 py-3"
              >
                %Change
              </th>
              <th
                scope="col"
                className="2xl:10 xl:px-9 lg:px-8 md:px-7 sm:px-7 py-3"
              >
                Open
              </th>
              <th
                scope="col"
                className="2xl:10 xl:px-9 lg:px-8 md:px-7 sm:px-7 py-3"
              >
                High
              </th>
              <th
                scope="col"
                className="2xl:10 xl:px-9 lg:px-8 md:px-7 sm:px-7 py-3"
              >
                Low
              </th>
              <th
                scope="col"
                className="2xl:10 xl:px-9 lg:px-8 md:px-7 sm:px-7 py-3"
              >
                Previous
              </th>
            </tr>
          </thead>
          <tbody>{stockData.map(create_row)}</tbody>
        </table>
      ) : (
        <h2>Unable to Show Data</h2>
      )}
    </span>
  );
}
 export default StockTable;