import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import banner1 from "../images/banner10.jpg";
import Navbar from "../components/Navbar";
function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="relative h-full">
        <div className="opacity-100 inset-20 absolute inset-0 h-0 w-12 block max-w-sm p-6 bg-transparent">
          <h1 className="inset -absolute mb-2 text-6xl font-bold tracking-tight text-slate-200">
            PREDICT
          </h1>
          <h1 className="inset -absolute mb-2 text-center text-6xl font-bold tracking-tight text-slate-200">
            THE
          </h1>
          <h1 className="inset -absolute mb-2 text-6xl font-bold tracking-tight text-slate-200">
            FUTURE
          </h1>
        </div>
        <img
          src={banner1}
          alt="Stock-Vision"
          className=" w-full 2xl:basis-1/3 xl:basis-1/3 lg:basis-1/3 md:basis-1/3 basis-full:sm-basis-left"
        />
      </div>
    </>
  );
}

export default Home;
