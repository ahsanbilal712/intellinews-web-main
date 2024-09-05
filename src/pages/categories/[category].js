import { MongoClient } from "mongodb";
import Link from "next/link";
import HeaderTwo from "../../components/header/HeaderTwo";

const formatHeadlineForUrl = (headline) => {
  return encodeURIComponent(headline);
};

// Utility function to format the time ago

const CategoryPage = ({ news }) => {
  if (!news || news.length === 0) {
    return <div>No news found for this category.</div>;
  }

  // Sort the news array by created_at date in descending order
  const sortedNews = [...news].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div>
      <HeaderTwo />

      <h1>Category: {sortedNews[0].Category}</h1>
      {sortedNews.map((item) => (
        <div key={item._id}>
          <h2>{item.Headline}</h2>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { category } = context.params;

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("intelli-news-db");

  // Retrieve news sorted by created_at date in descending order directly from the database
  const news = await db
    .collection("data_news")
    .find({ Category: category })
    .sort({ created_at: -1 }) // Sorting by created_at in descending order
    .toArray();
  client.close();

  return {
    props: {
      news: news.map((document) => JSON.parse(JSON.stringify(document))),
    },
  };
};

export default CategoryPage;
