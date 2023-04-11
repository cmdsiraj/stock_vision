import React from "react";
import SideChart from "../components/SideChart";
import StockTable from "../components/stockTable";
import Converter from "../components/converter";

function Home() {
  return (
    <>
<div class="mt-10 ml-5 flex gap-4 h-81 w-11/12">
  <StockTable class="basis-2/3" />
  <SideChart class="basis-1/3"/>

</div>
      <div>
        <Converter />
      </div>
      
    </>
  );
}

export default Home;
