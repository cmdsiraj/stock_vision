import React from "react";

function ImageCard({ src, caption }) {
  return (
    <div className="flex flex-col p-4 m-4 justify-center items-center rounded-lg shadow-xl dark:shadow-gray-600">
      {caption != "undefined" ? (
        <h3 className="text-slate-500 text-base font-semibold">{caption}</h3>
      ) : (
        <></>
      )}
      <figure className="max-w-lg">
        <img className="h-auto max-w-full" src={src} alt="image description" />
      </figure>
    </div>
  );
}

export default ImageCard;
