import { useRouter } from 'next/router';
import { getPostById } from '../../../lib/api';

const NewsArticle = ({ news }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>{news.Headline}</h1>
      <p>{news.Summary}</p>
    </>
  );
}

export default NewsArticle;

export async function getStaticPaths() {
  const ids = await getPostIds();
  const paths = ids.map(id => ({
    params: { id },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const news = await getPostById(params.id);

  return { props: { news } };
}
