// src/components/news/CategoriesGrid.js

import React, { useEffect, useState } from "react";
import Link from "next/link";

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

const formatHeadlineForUrl = (headline) => {
  return encodeURIComponent(headline.replace(/\s+/g, "-"));
};

const CategoriesGrid = ({ selectedCategories, newsData }) => {
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    const filtered = newsData.filter((item) =>
      selectedCategories.includes(item.Category)
    );
    setFilteredNews(filtered);
  }, [selectedCategories, newsData]);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {selectedCategories.length === 0 ? (
          <div>Please select a category to display news.</div>
        ) : (
          selectedCategories.map((category, index) => (
            <CategoryNews
              key={index}
              category={category}
              news={filteredNews.filter(
                (newsItem) => newsItem.Category === category
              )}
            />
          ))
        )}
      </div>
    </div>
  );
};

const CategoryNews = ({ category, news }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-5xl flex justify-center font-bold hover-line mb-4">
        <Link href={`/categories/${category}`}>
          <a className="mx-auto">
            {category} {">"}{" "}
          </a>
        </Link>
      </h2>
      <hr className="text-lg h-1 w-full bg-slate-600 mb-4" />
      {news.slice(0, 3).map((item) => (
        <div className="flex flex-row p-4 " key={item._id}>
          <Link href={`/news/${formatHeadlineForUrl(item.Headline)}`}>
            <a className="flex-shrink-0">
              <div className="w-32 h-32 -mt-3 overflow-hidden group">
                <img
                  src={item.image_url}
                  alt={item.Headline}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                />
              </div>
            </a>
          </Link>

          <div className="media-body px-4 flex flex-col justify-between">
            <div
              className="text-xl hover-line font-bold -mt-4"
              style={{ lineHeight: "1.3" }}
            >
              <Link href={`/news/${formatHeadlineForUrl(item.Headline)}`}>
                <a>{item.Headline}</a>
              </Link>
            </div>
            <div className="text-lg mt-1">{formatTimeAgo(item.created_at)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesGrid;
