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
        <div key={item._id} className="mb-4">
          <Link href={`/news/${item._id}`}>
            <a className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/3 h-40 md:h-24 overflow-hidden rounded-lg">
                <div className="w-32 h-32 overflow-hidden group">
                  <img
                    src={
                      item.image_url ||
                      "/images/news-images/news_background.jpg"
                    }
                    alt={item.Headline}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="md:ml-8 mt-2 md:mt-0">
                <h3 className="text-xl font-semibold hover:underline">
                  {item.Headline}
                </h3>
                <p className="text-sm text-gray-600">
                  {formatTimeAgo(item.created_at)}
                </p>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoriesGrid;
