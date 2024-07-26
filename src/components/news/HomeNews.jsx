// src/components/news/HomeNews.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { slugify } from "../../utils";
import newsImg from "../../../public/images/news-images/news_background.jpg";

const HomeNews = ({ news, category, setCategory }) => {
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="container">
      {/* <div className="select-category">
        <select onChange={handleCategoryChange} value={category}>
          <option value="">All Categories</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Pakistan">Pakistan</option>
          <option value="Sports">Sports</option> */}
      {/* Add more categories as needed */}
      {/* </select>
      </div> */}
      <div className="col mt-5 mb-5">
        {news.map((newsItem) => (
          <div className="col-lg-4 col-md-6 w-[1200px] " key={newsItem._id}>
            <div className="flex flex-row p=10 mt-[30px]">
              <Link href={`/news/${newsItem._id}`}>
                <a className="align-self-center ">
                  <div className="w-[210px] h-[170px] overflow-hidden group">
                    <img
                      src={newsItem.image_url}
                      alt={news.Headline}
                      className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                    />
                  </div>
                </a>
              </Link>

              <div className="media-body px-10">
                <div className="post-cat-group m-b-xs-10">
                  <Link href={`/news/${newsItem._id}`}>
                    <a className={`post-cat cat-btn bg-color-blue-one`}>
                      {newsItem.Category}
                    </a>
                  </Link>
                </div>
                <div
                  className="text-5xl hover-line font-bold"
                  style={{ lineHeight: "1.3" }}
                >
                  <Link href={`/news/${newsItem._id}`}>
                    <a>{newsItem.Headline}</a>
                  </Link>
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
