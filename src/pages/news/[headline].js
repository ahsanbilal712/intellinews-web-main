import { MongoClient } from "mongodb";
import HeadMeta from "../../components/elements/HeadMeta";
import FooterOne from "../../components/footer/FooterOne";
import HeaderTwo from "../../components/header/HeaderTwo";
import NewsLayout from "../../components/post/layout/NewsLayout";

const NewsPage = ({ news }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeadMeta metaTitle={news ? news.Headline : "News Not Found"} />
      <HeaderTwo />
      {news ? (
        <NewsLayout news={news} />
      ) : (
        <div className="flex-grow flex justify-center items-center">
          <h1 className="text-3xl font-bold">News Not Found</h1>
        </div>
      )}
      <FooterOne />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { headline } = context.params;

  if (!headline) {
    return { props: { news: null } };
  }

  let client;
  try {
    client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db("intelli-news-db");
    const news = await db
      .collection("data_news")
      .findOne({ Headline: decodeURIComponent(headline) });

    return {
      props: {
        news: news ? JSON.parse(JSON.stringify(news)) : null,
      },
    };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return { props: { news: null } };
  } finally {
    if (client) {
      client.close();
    }
  }
};

export default NewsPage;
