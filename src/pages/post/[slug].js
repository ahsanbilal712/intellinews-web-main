// At the beginning of your src/pages/post/[slug].js
import { useRouter } from 'next/router';
import { getPostById, getPostIds } from '../../../lib/api';  // Ensure getPostIds is included here
import { getAllSlugs } from '../../../lib/api';  // Adjust the function name and import path as necessary


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
	const posts = await getAllSlugs();  // This function must fetch all posts with their slugs
	const paths = posts.map(post => ({
	  params: { slug: post.slug }  // Ensure that post.slug is a string
	}));
  
	return {
	  paths,
	  fallback: 'blocking'  // or 'false', depending on your requirements
	};
  }

export async function getStaticProps({ params }) {
  const news = await getPostById(params.id);

  return { props: { news } };
}
