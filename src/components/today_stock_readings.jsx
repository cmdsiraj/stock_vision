import React from 'react';

function todayStockReadings() {
    // const stockname()=>
    return(
        <>
            <div>
                <h1 className="font-bold text-2xl px-2 py-3">Today's stock data for "stockname from constant"</h1>
            </div>
        <div className='pl-10 pr-10 grid grid-cols-6 gap-6 flex flex-row space-x-4 text-white items-center '>
            <button  className="rounded-lg  px-10 py-3  bg-blue-600 flex flex-col">
                <p>###</p>
                <p>OPEN</p>
            </button>
            <button  className="rounded-lg  px-11 py-3  bg-yellow-400 flex flex-col">
                <p>###</p>
                <p>HIGH</p>
            </button>
            <button  className="rounded-lg  px-11 py-3  bg-green-400 flex flex-col">
                <p>###</p>
                <p>LOW</p>
            </button>
            <button  className="rounded-lg  px-10 py-3  bg-red-600 flex flex-col">
                <p>###</p>
                <p>CLOSE</p>
            </button>
            <button  className="rounded-lg  px-7 py-3  bg-yellow-700 flex flex-col">
                <p>###</p>
                <p>ADJ CLOSE</p>
            </button>
            <button  className="rounded-lg  px-9 py-3  bg-purple-500 flex flex-col">
                <p>###</p>
                <p>VOLUME</p>
            </button>

        </div>
        </>
    );
}

export default todayStockReadings;
