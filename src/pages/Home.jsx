import React from "react";
import SideChart from "../components/SideChart";
import StockTable from "../components/stockTable";
import Converter from "../components/converter";

function Home() {
  return (
    <>
      <div>
        <StockTable />
        <SideChart />
      </div>
      {/* <div>
        <Converter />
      </div> */}
    </>
  );
}

export default Home;
