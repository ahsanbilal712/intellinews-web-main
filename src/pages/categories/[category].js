// src/pages/categories/[category].js
import { MongoClient } from 'mongodb';
import Link from 'next/link';
import HeadMeta from '../../components/elements/HeadMeta';
import FooterOne from '../../components/footer/FooterOne';
import HeaderTwo from '../../components/header/HeaderTwo';

const CategoryPage = ({ news }) => {
  if (!news || news.length === 0) {
    return <div>No news found for this category.</div>;
  }
     
  return (
    <>
      <HeadMeta metaTitle={`News Category: ${news[0].Category}`}/>
      <HeaderTwo />
      <div>
        <h1>Category: {news[0].Category}</h1>
        <ul>
          {news.map(item => (
            <li key={item._id}>
              <Link href={`/news/${item._id}`}>
                <a><h2>{item.Headline}</h2></a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <FooterOne />
    </>
  );
};

export async function getServerSideProps(context) {
  const { category } = context.params;
  
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('db');

  const news = await db.collection('news_summaries').find({ Category: category }).toArray();
  client.close();

  return {
    props: {
      news: news.map(document => JSON.parse(JSON.stringify(document)))
    }
  };
}

export default CategoryPage;
