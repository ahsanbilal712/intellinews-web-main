import React, { useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const formatHeadlineForUrl = (headline) => {
  return encodeURIComponent(headline);
};

const HomeNews = ({ news = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 20;

  if (!Array.isArray(news)) {
    return <div>No news available</div>;
  }

  // Sort news items by the latest created_at date
  const sortedNews = [...news].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  // Calculate the indices for the current page
  const startIndex = (currentPage - 1) * newsPerPage;
  const endIndex = startIndex + newsPerPage;
  const currentNews = sortedNews.slice(startIndex, endIndex);

  return (
    <div className="container">
      <div className="col mt-5 mb-5">
        {currentNews.length > 0 ? (
          currentNews.map((newsItem) => (
            <div className="col-lg-4 col-md-6 w-full" key={newsItem._id}>
              <div className="flex flex-col p-4 mt-[30px]">
                <div
                  className="text-3xl md:text-2xl lg:text-3xl xl:text-5xl font-bold"
                  style={{ lineHeight: "1.3" }}
                >
                  {newsItem.Headline}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No news available</div>
        )}
      </div>
    </div>
  );
};

// Define prop types
HomeNews.propTypes = {
  news: PropTypes.array,
};

export default HomeNews;
