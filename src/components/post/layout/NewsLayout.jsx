// src/components/post/NewsLayout.jsx
import React from "react";
import Link from "next/link";
import SourcesLayout from "./SourcesLayout";

const NewsLayout = ({ news }) => {
  if (!news)
    return (
      <div className="news-not-found text-center py-10">No news found.</div>
    );

  return (
    <div className="news-article section-gap p-t-xs-15 p-t-sm-60">
      <div className="container">
        <h1 className="news-headline">{news.Headline}</h1>
        <h3 className="news-category">Category: {news.Category}</h3>
        <p className="news-summary">{news.Summary}</p>

        <SourcesLayout news={news} />
      </div>
    </div>
  );
};

export default NewsLayout;
