import React,{useRef} from "react";
import {useNavigate} from 'react-router-dom';
import SideChart from "../components/SideChart";
import StockTable from "../components/stockTable";
import Converter from "../components/converter";
import banner from "../images/banner.jpg";
import StockPrediction from "./StockPrediction";
import LoadingScreen from "../components/LoadingScreen"

function LivePrices(){
    return(
        <div className="flex xl:flex-row lg:flex-row md:flex-row flex-col sm:flex-left">
        <div  className=" 2xl:basis-2/3 xl:basis-2/3 lg:basis-2/3 md:basis-1/3" >
            <StockTable/>
        </div>
        <div className="2xl:basis-1/3 xl:basis-1/3 lg:basis-1/3 md:basis-1/3 basis-full:sm-basis-left">
      <SideChart />
        </div>
    </div>
    );
}
export default LivePrices;