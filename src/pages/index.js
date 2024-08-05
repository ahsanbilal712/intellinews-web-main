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
      <div>
        <h1>Heloo world</h1>
      </div>
    </>
  );
}

export default HomeTwo;
