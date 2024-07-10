// src/components/news/HomeNews.jsx
import React from 'react';
import Link from 'next/link';

const HomeNews = ({ news, category, setCategory }) => {
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <select onChange={handleCategoryChange} value={category}>
        <option value="">All Categories</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Pakistan">Pakistan</option>
        <option value="Sports">Sports</option>
        {/* Add more categories as needed */}
      </select>
      <div>
        <ul>
          {news.map(newsItem => (
            <li key={newsItem._id}>
              <Link href={`/news/${newsItem._id}`}>
                <a><h2>{newsItem.Headline}</h2></a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HomeNews;