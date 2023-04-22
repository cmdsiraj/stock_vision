import React, { useState, useEffect } from "react";
import StockRow from "./stockRow";

function create_row(stock) {
  console.log("creat_row");
  return (
    <StockRow
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
    <div>
        {visible && stockData.length != 0 ? (
          <div class="flex items-stretch relative w-fit  shadow-md">
          <table class="border-collapse overflow-y-hidden text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class={th_style}>
                  Name
                </th>
                <th scope="col" class={th_style}>
                  Value
                </th>
                <th scope="col" class={th_style}>
                  Change
                </th>
                <th scope="col" class={th_style}>
                  %Change
                </th>
                <th scope="col" class={th_style}>
                  Open
                </th>
                <th scope="col" class={th_style}>
                  High
                </th>
                <th scope="col" class={th_style}>
                  Low
                </th>
                <th scope="col" class={th_style}>
                  Previous
                </th>
              </tr>
            </thead>
            <tbody>
        {stockData.map(create_row)}
        </tbody>
        </table>
        </div>
      ) : visible && stockData.length === 0 ? (
<></>        ) : (
        <>Click to show!!</>
      )}
{console.log(stockData)}
      </div>
  );
}
 export default StockTable;