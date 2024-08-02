import Link from "next/link";
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderTwo from "../components/header/HeaderTwo";
import HomeNews from "../components/news/HomeNews";
import TopNewsSection from "../components/news/TopNewsSection";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

function HomeTwo() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const { data, error } = useSWR(`/api/news?category=${category}`, fetcher);

  if (error) return <div>Failed to load data.</div>;
  if (!data) return <div>Loading...</div>;

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory) {
      router.push(`/categories/${selectedCategory}`);
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
      <FooterOne />
    </>
  );
}

export default HomeTwo;
