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
        <h3>Category: {news.Category}</h3>
        <p>{news.Summary}</p>
        <div>
          {news.sources && news.sources.map((source, index) => (
            <div key={index}>
              <h2>{source.SourceName}</h2>
              <h3><a href={source.SourceUrl} target="_blank" rel="noopener noreferrer">Link to Source</a></h3>
            </div>
          ))}
        </div>
      </div>
      <FooterOne />
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  if (!ObjectId.isValid(id)) {
    return {
      props: {
        news: null
      }
    };
  }
  
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('db');

  const news = await db.collection('news_summaries').findOne({_id: new ObjectId(id)});
  client.close();

  return {
    props: {
      news: news ? JSON.parse(JSON.stringify(news)) : null
    }
  };
}

export default NewsPage;
