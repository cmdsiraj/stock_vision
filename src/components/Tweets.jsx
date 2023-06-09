import React from "react";
import twitter from "../images/twitter.png";

function Tweets({ ticker, tweets }) {
  return (
    <>
      <div className="rounded-lg text-left text-top bg-cyan-100 p-4 m-4">
        <h3 className="font-sans text-2xl px-2 py-3">
          Recent TWEETS about {ticker}
        </h3>
        <table className="">
          <thead>
            <tr>
              <th>#</th>
              <th>Tweets</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="relative w-1/12">
                <img src={twitter} className="absolute top-0 left-0" />
              </td>
              <td>
                {tweets.map((tweet) => {
                  return (
                    <li className="text-sm font-mono m-2" key={tweet}>
                      {tweet}
                    </li>
                  );
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
