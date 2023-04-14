import React from "react";
import SideChart from "../components/SideChart";
import StockTable from "../components/stockTable";
import Converter from "../components/converter";

function Home() {
  return (
    <>
      <div className="flex xl:flex-row lg:flex-row md:flex-row flex-col sm:flex-left">
          <div className="basis-2/3">
         <StockTable />
          </div>
          <div className="xl:basis-1/3 lg:basis-1/3 md:basis-full basis-full:sm-basis-left">
        <SideChart />
          </div>
      </div>
      {/* <div>
        <Converter />
      </div> */}
    </>
  );
}

export default Home;
