import React,{useRef} from "react";
import {useNavigate} from 'react-router-dom';
import SideChart from "../components/SideChart";
import StockTable from "../components/stockTable";
import banner from "../images/banner.jpg";
import StockPrediction from "./StockPrediction";
import LoadingScreen from "../components/LoadingScreen"
import Navbar from "../components/Navbar";
function LivePrices(){
    return(
        <div>
            <Navbar/>
        <div className="mt-3 ml-2 flex gap-2 xl:flex-row lg:flex-row md:flex-row flex-col ">
        <div  className="basis:2/3 " >
            <StockTable/>
        </div>
        <div className="basis-1/3">
            <SideChart />
        </div>
    </div>
    </div>
    );
}
export default LivePrices;
