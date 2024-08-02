// src/pages/index.js (or HomeTwo component)

import Link from "next/link";
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderTwo from "../components/header/HeaderTwo";
import useSWR from "swr";
import { useState, useEffect } from "react";
import CategoriesLatestSection from "../components/news/CategoriesLatestSection";
import TopNewsSection from "../components/news/TopNewsSection";

const fetcher = (url) => fetch(url).then((res) => res.json());

function HomeTwo() {
  const initialCategories = ["Pakistan", "World", "Sports"];

  const [selectedCategories, setSelectedCategories] =
    useState(initialCategories);
  const [category, setCategory] = useState(""); // Track the current category for TopNewsSection

  const categories = [
    "Pakistan",
    "Politics",
    "International",
    "Sports",
    "Entertainment",
    "Weather",
    "Health",
    "Science",
    "Technology",
    "Economy",
  ];

  const { data, error } = useSWR(`/api/news`, fetcher);

  if (error) return <div>Failed to load data.</div>;
  if (!data) return <div>Loading...</div>;

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
    <>
      <HeadMeta metaTitle="Home" />
      <HeaderTwo />
      <TopNewsSection
        news={data}
        category={category}
        setCategory={setCategory}
      />
      <div className="container mt-5">
        <div className=" my-5 text-5xl font-bold">Your Topics</div>

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
        <CategoriesLatestSection
          selectedCategories={selectedCategories}
          newsData={data}
        />
      </div>
      <FooterOne />
    </>
  );
}

export default HomeTwo;
