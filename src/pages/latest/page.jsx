// src/components/news/HomeNews.jsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { slugify } from "../../utils";
import newsImg from "../../../public/images/news-images/news_background.jpg";

// Utility function to format the time ago
function formatTimeAgo(createdAt) {
  const now = new Date();
  const diff = Math.abs(now - new Date(createdAt)); // Difference in milliseconds
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `published just now`;
  } else if (minutes < 60) {
    return `published ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (hours < 24) {
    return `published ${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    return `published ${days} ${days === 1 ? "day" : "days"} ago`;
  }
}

const HomeNews = ({ news, category, setCategory }) => {
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Sort news items by the latest created_at date
  const sortedNews = [...news].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div className="container">
      <div className="col mt-5 mb-5">
        {sortedNews.map((newsItem) => (
          <div className="col-lg-4 col-md-6 w-[1200px]" key={newsItem._id}>
            <div className="flex flex-row p=10 mt-[30px]">
              <Link href={`/news/${newsItem._id}`}>
                <a className="align-self-center">
                  <div className="w-[210px] h-[170px] overflow-hidden group">
                    <img
                      src={newsItem.image_url}
                      alt={newsItem.Headline} // Fix the alt text to use the correct field
                      className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                    />
                  </div>
                </a>
              </Link>

              <div className="media-body px-10 flex justify-between flex-col">
                <div className="post-cat-group m-b-xs-10">
                  <Link href={`/news/${newsItem._id}`}>
                    <a className={`post-cat cat-btn bg-color-blue-one`}>
                      {newsItem.Category}
                    </a>
                  </Link>
                </div>
                <div
                  className="text-5xl hover-line -mt-12 font-bold"
                  style={{ lineHeight: "1.3" }}
                >
                  <Link href={`/news/${newsItem._id}`}>
                    <a>{newsItem.Headline}</a>
                  </Link>
                </div>
                <div className="text-2xl">
                  {formatTimeAgo(newsItem.created_at)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeNews;
