import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import Navbar from "../components/Navbar";

const News = () => {
  const [topUsBusinessNews, setTopUsBusinessNews] = useState([{}]);
  const [topTechCrunchNews, setTopTechCrunchNews] = useState([{}]);
  const [display, setDisplay] = useState(false);

  const setOpeningNews = () => {
    console.log("yes");
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d68267c207094522af77183492da714a"
      )
      .then((response) => {
        console.log(response.data.articles[0].source.id);
        console.log(response.data.articles[0].title);
        setTopUsBusinessNews(response.data.articles);
      });

    axios
      .get(
        "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=d68267c207094522af77183492da714a"
      )
      .then((response) => {
        //   console.log(response.data);
        setTopTechCrunchNews(response.data.articles);
        // console.log(topTechCrunchNews);
        //   setTopTechCrunchNews(response.data.articles);
      });
  };

  const log = (news) => {
    console.log("ok");
    console.log(news.source.id);
    console.log(news.source.name);
  };

  useEffect(() => {
    if (!display) {
      setOpeningNews();
      setDisplay(!display);
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="p-4">
        <div className="mb-4">
          <h1 className="text-6xl font-bold font-serif">Trending News</h1>
          <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 m-4">
            {topUsBusinessNews.map((news) => (
              <NewsCard
                image={news.urlToImage}
                headline={news.title}
                source={news.source ? news.source.name : "Stock Vision"}
                description={news.description}
                author={news.author ? news.author : "Stock Vision"}
                time={news.publishedAt}
                url={news.url}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h1 className="text-6xl font-bold font-serif">Tech Crunch</h1>
          <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 m-4">
            {topTechCrunchNews.map((news) => (
              <NewsCard
                image={news.urlToImage}
                headline={news.title}
                source={news.source ? news.source.name : "Stock Vision"}
                description={news.description}
                author={news.author ? news.author : "Stock Vision"}
                time={news.publishedAt}
                content={news.content}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
