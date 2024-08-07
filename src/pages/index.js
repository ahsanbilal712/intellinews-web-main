// src/pages/index.js (or HomeTwo component)

import Link from "next/link";
import Head from "next/head"; // Import Head from next/head
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderTwo from "../components/header/HeaderTwo";
import useSWR from "swr";
import { useState } from "react";
import CategoriesLatestSection from "../components/news/CategoriesLatestSection";
import TopNewsSection from "../components/news/TopNewsSection";
import Loading from "../components/loading/Loading";
import AdSense from "../components/Adsense";

const fetcher = (url) => fetch(url).then((res) => res.json());

function HomeTwo() {
  const initialCategories = ["Pakistan", "World", "Sports"];

  const [selectedCategories, setSelectedCategories] =
    useState(initialCategories);
  const [category, setCategory] = useState(""); // Track the current category for TopNewsSection

  const categories = [
    "Pakistan",
    "World",
    "Sports",
    "Business",
    "Entertainment",
    "Weather",
    "Health",
    "Science",
    "Technology",
  ];

  const { data, error } = useSWR(`/api/news`, fetcher);

  if (error) return <div>Failed to load data.</div>;
  if (!data) return <Loading />;

  // Handle category selection/deselection
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategories.includes(selectedCategory)) {
      // Remove category if already selected
      setSelectedCategories(
        selectedCategories.filter((category) => category !== selectedCategory)
      );
    } else {
      // Add category if not selected
      setSelectedCategories([...selectedCategories, selectedCategory]);
    }
  };

  return (
    <html lang="en">
      {/* Add AdSense script directly if needed */}
      <head>
        <AdSense pid="ca-pub-5812499395538486" />
        <meta name="google-adsense-account" content="ca-pub-5812499395538486" />
      </head>

      <HeadMeta metaTitle="Home" />
      <body>
        <HeaderTwo />

        <TopNewsSection
          news={data}
          category={category}
          setCategory={setCategory}
        />

        <div className="container mt-5">
          <div className="my-5 text-5xl font-bold">Your Topics</div>

          <div className="mb-3">
            <h5>Select Categories</h5>
            <div className="flex flex-wrap gap-4">
              {categories.map((category, index) => (
                <div key={index} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`category-${index}`}
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategoryChange}
                  />
                  <label
                    className="form-check-label ml-2"
                    htmlFor={`category-${index}`}
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* AdSense Ad Unit */}
          <div className="adsense-container my-5">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-5812499395538486"
              data-ad-slot="your-ad-slot" // Replace with actual ad slot ID
              data-ad-format="auto"
            ></ins>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                (adsbygoogle = window.adsbygoogle || []).push({});
              `,
              }}
            />
          </div>

          <CategoriesLatestSection
            selectedCategories={selectedCategories}
            newsData={data}
          />
        </div>

        <FooterOne />
      </body>
    </html>
  );
}

export default HomeTwo;
