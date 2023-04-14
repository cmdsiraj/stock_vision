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

  return (
    <div class="flex items-stretch pl-1 pt-1 pr-1  relative w-fit overflow-auto shadow-md">
      <table class="overflow-auto text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="xl:px-10 lg:px-16 md:px-14 sm:px-10 px-20 sm:px-left py-3 ">
              Name
            </th>
            <th scope="col" class="xl:px-8 lg:px-7 md:px-7 sm:px-7 py-3">
              Value
            </th>
            <th scope="col" class="xl:px-8 lg:px-7 md:px-7 sm:px-7 py-3">
              Change
            </th>
            <th scope="col" class="px-9 py-3 ">
              %Change
            </th>
            <th scope="col" class="px-9 py-3 ">
              Open
            </th>
            <th scope="col" class="px-9 py-3 ">
              High
            </th>
            <th scope="col" class="px-9 py-3 ">
              Low
            </th>
            <th scope="col" class="px-9 py-3 ">
              Previous
            </th>
          </tr>
        </thead>
        <tbody>


          {/* {get_data()} */}

        {visible && stockData.length != 0 ? (
stockData.map(create_row)
      ) : visible && stockData.length === 0 ? (
        <h2>Unable to Show Data</h2>
      ) : (
        <>Click to show!!</>
      )}
{console.log(stockData)}
        </tbody>
      </table>
      </div>
  );
}

export default StockTable;
