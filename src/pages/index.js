

import Link from 'next/link';
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderTwo from "../components/header/HeaderTwo";
import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

function HomeTwo() {
  const { data, error } = useSWR('/api/news', fetcher);

  if (error) return <div>Failed to load data.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <HeadMeta metaTitle="Home"/>
      <HeaderTwo />
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






