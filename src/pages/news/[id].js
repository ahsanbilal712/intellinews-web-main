// src/pages/news/[id].js
import { MongoClient, ObjectId } from "mongodb";
import HeadMeta from "../../components/elements/HeadMeta";
import FooterOne from "../../components/footer/FooterOne";
import HeaderTwo from "../../components/header/HeaderTwo";
import NewsLayout from "../../components/post/layout/NewsLayout";

const NewsPage = ({ news }) => {
  return (
    <>
      <div className="bg-red-400">
        <HeadMeta metaTitle={news ? news.Headline : "News Not Found"} />
        <HeaderTwo />

        <NewsLayout news={news} />
        <FooterOne />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  if (!ObjectId.isValid(id)) {
    return { props: { news: null } };
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db("db");
  const news = await db
    .collection("news_summaries")
    .findOne({ _id: new ObjectId(id) });
  client.close();

  return {
    props: {
      news: news ? JSON.parse(JSON.stringify(news)) : null,
    },
  };
}

export default NewsPage;
