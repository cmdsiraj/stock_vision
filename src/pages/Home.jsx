import React from "react";
import SideChart from "../components/SideChart";
import StockTable from "../components/stockTable";

function Home() {
  return (
    <>
<div class="flex flex-row h-72 w-full">
  <StockTable class="basis-1/3" />
  <SideChart class="basis-2/3"/>

</div>
      
      
    </>
  );
}

export default Home;
