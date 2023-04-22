import React from "react";
import SA from "../temp/SA.png";

function ResultFooterImages({ ticker, data }) {
  const arr = [123.21, 123.32, 122.87, 125.89, 120.22, 127.08, 123.9];
  return (
    <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl-flex-row p-2 justify-center items-center ">
      <div className=" rounded-lg shadow-xl dark:shadow-gray-600 flex flex-col h-72 flex-1 p-4 m-4 justify-center items-center shadow-md sm:rounded-lg lg:pe-16 md:pe-10 sm:pe-6">
        <h3 className="text-slate-500 text-base font-semibold">
          SENTIMENT ANALYSIS OF {ticker} TWEETS
        </h3>
        <figure className="max-w-lg">
          <img className="h-64 max-w-full" src={SA} alt="image description" />
        </figure>
      </div >
      <div className=" rounded-lg shadow-xl dark:shadow-gray-600 flex-1 bg-no-repeat bg-contain bg-center h-72 overflow-x-auto p-2 text-xl shadow-md sm:rounded-lg lg:pe-16 md:pe-10 sm:pe-6">
      <h3 className="text-slate-500 text-base font-semibold justify-center text-center">
          PREDICTED {ticker} PRICE FOR NEXT 7 DAYS 
        </h3>
        <table className="w-full border-spacing-2">
          <tr className="">
            <td>
              <img className="h-56 w-full" src="https://st2.depositphotos.com/6235482/9467/i/450/depositphotos_94670644-stock-photo-chart-on-white-background.jpg" />
            </td>
            <td className="">
            <span className="flex text-left flex-col h-fit sm:pt-3">
          {data.map((a) => {
            return (
              <span className="mb-2 font-sans-italic text-sm text-gray-700 font-semibold md:text-base lg:text-base xl:text-base">
                {a[0].toFixed(5)}
                {console.log(a)}
              </span>
            );
          })}
        </span>
            </td>
          </tr>

        </table>

      </div>
    </div>
  );
}

export default ResultFooterImages;

// {/* <div class=" overflow-x-auto p-2 text-xl shadow-md sm:rounded-lg">
//         <table class="w-full h-full text-black-500 dark:text-gray-400">
//           <th className="text-slate-400">Prediction for next 7 days</th>
//           <tr className="dark:bg-gray-900 dark:border-gray-700">
//             <td className="flex flex-row">
//               <figure className="max-w-xs">
//                 <img
//                   className="h-auto max-w-full"
//                   src={stockUp}
//                   alt="Stock up image"
//                 />
//               </figure>
//               <div>
//                 {arr.map((element) => {
//                   return (
//                     <tr>
//                       <td className="mx-2 px-4">{element}</td>
//                     </tr>
//                   );
//                 })}
//               </div>
//             </td>
//             {/* <td className="m-4"></td> */
//           </tr>
//         </table>
//       </div> */}
