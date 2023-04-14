import React from "react";
import SA from "../temp/SA.png";

function ResultFooterImages({ ticker, data }) {
  const arr = [123.21, 123.32, 122.87, 125.89, 120.22, 127.08, 123.9];
  return (
    <div className="flex flex-row p-2 justify-center items-center">
      <div className="flex flex-col flex-1 p-4 m-4 justify-center items-center rounded-lg shadow-xl dark:shadow-gray-800">
        <h3 className="text-slate-500 text-base font-semibold">
          SENTIMENT ANALYSIS OF {ticker} TWEETS
        </h3>
        <figure className="max-w-lg">
          <img className="h-auto max-w-full" src={SA} alt="image description" />
        </figure>
      </div>
      <div className="flex-1  bg-no-repeat bg-contain bg-center h-3/6 bg-[url('https://img.freepik.com/free-photo/copy-space-arrow-collection_23-2148543340.jpg?w=740&t=st=1681507208~exp=1681507808~hmac=22c0e625dde4044d9e3915b40d9b673547686829ba85751b894715084f654a13')] bg-blend-multiply overflow-x-auto p-2 text-xl shadow-md sm:rounded-lg lg:pe-16 md:pe-10 sm:pe-6">
        <span className="flex text-center flex-col h-full sm:pt-6 text-center">
          {data.map((a) => {
            return (
              <span className="py-2 font-semibold w-full text-gray-900">
                {a}
              </span>
            );
          })}
        </span>
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
