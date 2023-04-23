import React from "react";
import { useParams } from "react-router-dom";

const NewsDetail = ({ image, headline, source, url, time, content }) => {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <img className="w-full h-64 object-cover mb-8" src={image} alt={headline} />
        <div className="flex justify-between items-center">
          <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide">
            {source}
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
            Visit Site
          </a>
        </div>
        <h1 className="text-3xl font-bold mt-4">{headline}</h1>
        <div className="text-gray-600 text-xs mt-2">{`By ${author} | ${time}`}</div>
        <p className="mt-4">{content}</p>
      </div>
    </div>
  );
};

export default NewsDetail;
