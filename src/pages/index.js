import Link from 'next/link';
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderTwo from "../components/header/HeaderTwo";
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useState } from 'react';

const fetcher = url => fetch(url).then(res => res.json());

function HomeTwo() {
  const router = useRouter();
  const [category, setCategory] = useState('');
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
      <HeadMeta metaTitle="Home"/>
      <HeaderTwo />
      <select onChange={handleCategoryChange} value={category}>
        <option value="">All Categories</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Pakistan">Pakistan</option>
        <option value="Sports">Sports</option>
        {/* Add more categories as needed */}
      </select>
      <div>
        <ul>
          {data.map(news => (
            <li key={news._id}>
              <Link href={`/news/${news._id}`}>
                <a><h2>{news.Headline}</h2></a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <FooterOne />
    </>
  );
}

export default HomeTwo;
