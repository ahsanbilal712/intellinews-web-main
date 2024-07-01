import { MongoClient, ObjectId } from 'mongodb';
import HeadMeta from '../../components/elements/HeadMeta';
import FooterOne from '../../components/footer/FooterOne';
import HeaderTwo from '../../components/header/HeaderTwo';

const NewsPage = ({ news }) => {
  if (!news) {
    return <div>No news found.</div>;
  }

  return (
    <>
      <HeadMeta metaTitle={news.Headline}/>
      <HeaderTwo />
      <div>
        <h1>{news.Headline}</h1>
        <p>{news.Summary}</p>
      </div>
      <FooterOne />
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('db');

  // Use the 'new' keyword with ObjectId
  const news = await db.collection('news_summaries').findOne({_id: new ObjectId(id)});

  client.close();

  return {
    props: {
      news: news ? JSON.parse(JSON.stringify(news)) : null
    }
  };
}

export default NewsPage;
