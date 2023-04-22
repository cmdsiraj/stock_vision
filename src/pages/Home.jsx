import React,{useRef} from "react";
import {useNavigate} from 'react-router-dom';
import banner from "../images/banner.jpg";
function Home() {
    const navigate = useNavigate();
    return (
    <> 
        <div className="relative h-full">
            <img src={banner} alt="Stock-Vision" className="2xl:basis-1/3 xl:basis-1/3 lg:basis-1/3 md:basis-1/3 basis-full:sm-basis-left" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1 className="text-white  font-mono-bold tracking-wide mb-4 2xl:text-9xl xl:text-7xl lg:text-7xl md:text-7xl sm:text-7xl">STOCK VISION</h1>
                <h2 className="text-white  font-mono-bold tracking-wide mb-4 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl ">The future of stock market</h2>
                <div className="opacity-80  flex flex-row grid gap-20 grid-cols-2 text-white  font-mono-bold tracking-wide mb-4 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl">
                        <button onClick={() => navigate("/stockPrediction")} className="rounded-full  px-6 py-3 hover:bg-gray-800 bg-gray-900 transform hover:scale-110">Predict future prices</button>

                    <button onClick={()=>navigate("/livePrices")} className="rounded-full bg-sky-500 px-6 py-3 hover:bg-gray-800 bg-gray-900 transform hover:scale-110">live stock prices</button>
                </div>
            </div>
        </div>

    </>
  );
}

export default Home;
