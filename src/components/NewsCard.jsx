import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({
  image,
  headline,
  source,
  description,
  author,
  time,
  url,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
      <img className="w-full h-48 object-cover" src={image} alt={headline} />
      <div className="p-4">
        <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide">
          {source}
        </div>
        <a
          href={url}
          target="_blank"
          className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
        >
          {headline}
        </a>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <div className="text-xs text-gray-600">{`By ${author} | ${time}`}</div>
        <a href={url} target="_blank">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Read More
          </button>
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
