import React,{useRef} from "react";
import SideChart from "../components/SideChart";
import StockTable from "../components/stockTable";
import Converter from "../components/converter";
import banner from "../images/banner.jpg";
import StockPrediction from "./StockPrediction";
function Home() {
    const liveRef = useRef(null);

    function handleButtonClick() {
        liveRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
    <>
        {/* <div className="relative">
            <img src={banner} alt="Stock-Vision" className="2xl:basis-1/3 xl:basis-1/3 lg:basis-1/3 md:basis-1/3 basis-full:sm-basis-left" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1 className="text-white  font-mono-bold tracking-wide mb-4 2xl:text-9xl xl:text-7xl lg:text-7xl md:text-7xl sm:text-7xl">STOCK VISION</h1>
                <h2 className="text-white  font-mono-bold tracking-wide mb-4 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl ">The future of stock market</h2>
                <div className="opacity-80    flex flex-row grid gap-20 grid-cols-2 text-white  font-mono-bold tracking-wide mb-4 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl">
                        <button  className="rounded-full  px-6 py-3 hover:bg-gray-800 bg-gray-900 transform hover:scale-110">Predict future prices</button>

                    <button onClick={handleButtonClick} className="rounded-full bg-sky-500 px-6 py-3 hover:bg-gray-800 bg-gray-900 transform hover:scale-110">live stock prices</button>
                </div>
            </div>
        </div>
      <div className="flex xl:flex-row lg:flex-row md:flex-row flex-col sm:flex-left">
          <div ref={liveRef}  className="2xl:basis-2/3 xl:basis-2/3 lg:basis-2/3 md:basis-1/3 overflow-scroll sm:overflow-left" >
              <StockTable />
          </div>
          <div className="2xl:basis-1/3 xl:basis-1/3 lg:basis-1/3 md:basis-1/3 basis-full:sm-basis-left">
        <SideChart />
          </div>
      </div>
      <div className="flex xl:flex-row lg:flex-row md:flex-row flex-col sm:flex-left">
        <div className="2xl:basis-2/3 xl:basis-2/3 lg:basis-2/3 md:basis-1/3 overflow-scroll sm:overflow-left">
          <StockTable />
        </div>
        <div className="2xl:basis-1/3 xl:basis-1/3 lg:basis-1/3 md:basis-1/3 basis-full:sm-basis-left">
          <SideChart />
        </div>
      </div> */}
      <StockPrediction />
    </>
  );
}

export default Home;
