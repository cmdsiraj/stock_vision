import React from "react";
import twitter from "../images/twitter.png";

function Tweets({ ticker, tweets }) {
  return (
    <>
      <div className="rounded-lg text-left text-top bg-cyan-100 p-4 m-4">
        <h3 className="font-bold text-2xl px-2 py-3">
          RECENT TWEETS ABOUT {ticker}
        </h3>
        <table className="">
          <thead>
            <th>#</th>
            <th>Tweets</th>
          </thead>
          <tbody>
            <tr>
              <td className="relative w-1/12">
                <img src={twitter} className="absolute top-0 left-0" />
              </td>
              <td>
                {tweets.map((tweet) => {
                  return <li className="text-lg m-2">{tweet}</li>;
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Tweets;

{
  /* <button className="rounded-lg text-left  px-10 py-3  bg-slate-300 flex flex-col">
          <h1 className="font-bold text-2xl px-2 py-3">
            Recent Tweets about {ticker}
          </h1>
          <p className="text-sky-400/ py-2">#Twitter</p>
          {tweets.map((tweet) => {
            return <p className="font-semibold text-lg">{tweet}</p>;
          })}
        </button> */
}
