// src/components/post/PostSectionOne.jsx
import React from 'react';
import Link from 'next/link';

const PostSectionOne = ({ news }) => {
    if (!news) return <div className="news-not-found text-center py-10">No news found.</div>;

    return (
      <div className="news-article section-gap p-t-xs-15 p-t-sm-60">
        <div className="container">
          <h1 className="news-headline">{news.Headline}</h1>
          <h3 className="news-category">Category: {news.Category}</h3>
          <p className="news-summary">{news.Summary}</p>
          <div className="news-sources">
            {news.sources && news.sources.map((source, index) => (
              <div key={index} className="source-item">
                <h2 className="source-name">{source.SourceName}</h2>
                <h3>
                  <a href={source.SourceUrl} target="_blank" rel="noopener noreferrer" className="source-link">Link to Source</a>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default PostSectionOne;
