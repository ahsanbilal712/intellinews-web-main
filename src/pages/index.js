// import { getAllPosts } from "../../lib/api";
// import HeadMeta from "../components/elements/HeadMeta";
// import FooterOne from "../components/footer/FooterOne";
// import HeaderOne from "../components/header/HeaderOne";
// import PostSectionFive from "../components/post/PostSectionFive";
// import PostSectionFour from "../components/post/PostSectionFour";
// import PostSectionOne from "../components/post/PostSectionOne";
// import PostSectionSix from "../components/post/PostSectionSix";
// import PostSectionThree from "../components/post/PostSectionThree";
// import PostSectionTwo from "../components/post/PostSectionTwo";
//
// const HomeOne = ({allPosts}) => {
//
//   return (
//     <>
//     <HeadMeta metaTitle="Home"/>
//     <HeaderOne />
//     <PostSectionOne postData={allPosts} />
//     {/*<PostSectionTwo postData={allPosts} />*/}
//     {/*<PostSectionThree postData={allPosts} />*/}
//     {/*<PostSectionFour postData={allPosts} />*/}
//     {/*<PostSectionFive postData={allPosts} adBanner={true} />*/}
//     {/*<PostSectionSix postData={allPosts}/>*/}
//     <FooterOne />
//     </>
//    );
// }
//
// export default HomeOne;
//
//
// export async function getStaticProps() {
//   const allPosts = getAllPosts([
//     'postFormat',
//     'trending',
//     'story',
//     'slug',
//     'title',
//     'excerpt',
//     'featureImg',
//     'cate',
//     'cate_bg',
//     'cate_img',
//     'author_name',
//     'date',
//     'post_views',
//     'post_share',
//   ])
//
//   return {
//     props: { allPosts }
//   }
// }
//


import { getAllPosts } from "../../lib/api";
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderTwo from "../components/header/HeaderTwo";
import PostSectionFive from "../components/post/PostSectionFive";
import PostSectionSeven from "../components/post/PostSectionSeven";
import PostSectionSix from "../components/post/PostSectionSix";
import PostSectionThree from "../components/post/PostSectionThree";

//import SliderOne from "../components/slider/SliderOne";

const HomeTwo = ({allPosts}) => {

  return (
      <>
        <HeadMeta metaTitle="Home"/>
        <HeaderTwo />
        <PostSectionThree postData={allPosts} />
        {/*<PostSectionSeven postData={allPosts} />*/}
        <PostSectionFive postData={allPosts} />
        {/*<PostSectionSix postData={allPosts} />*/}
        <FooterOne />
      </>
  );
}

export default HomeTwo;

export async function getStaticProps() {
  const allPosts = await getAllPosts([
    '_id',
    'Headline',
    'Summary' // Specify more fields as necessary
  ]);

  // Serialize the data
  const posts = allPosts.map(post => ({
    id: post._id.toString(), // Convert ObjectId to string
    headline: post.Headline,
    summary: post.Summary
  }));

  return {
    props: { allPosts: posts }
  };
}

// import useSWR from 'swr';

// const fetcher = url => fetch(url).then(res => res.json());

// function HomePage() {
//   const { data, error } = useSWR('/api/news', fetcher);

//   if (error) return <div>Failed to load data.</div>;
//   if (!data) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Latest News Summaries</h1>
//       <ul>
//         {data.map(news => (
//           <li key={news._id}>
//             <h2>{news.Headline}</h2>
//             <p>{news.Summary}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default HomePage;