// src/pages/categories/[category].js

import { MongoClient } from "mongodb";
import Link from "next/link";
import Image from "next/image";
import HeadMeta from "../../components/elements/HeadMeta";
import FooterOne from "../../components/footer/FooterOne";
import HeaderTwo from "../../components/header/HeaderTwo";
import newsImg from "../../../public/images/news-images/news_background.jpg";


const CategoryPage = ({ news }) => {
  if (!news || news.length === 0) {
    return <div>No news found for this category.</div>;
  }

  return (
    <>
      <HeadMeta metaTitle={`News Category: ${news[0].Category}`} />
      <HeaderTwo />
      <div className="container">
        <h1 className="category-title">Category: {news[0].Category}</h1>
        <div className="col">
          {news.map((item) => (
            <div className="col-lg-4 col-md-6 w-[1200px]" key={item._id}>
              <div className="media post-block m-b-xs-30">
                <Link href={`/news/${item._id}`}>
                  <a className="align-self-center">
                    <Image
                      src={newsImg.src}
                      alt={item.Headline}
                      width={285}
                      height={145}
                      placeholder="blur"
                      blurDataURL="/images/placeholder.png"
                    />
                  </a>
                </Link>
                <div className="media-body">
                  <div className="post-cat-group m-b-xs-10">
                    <Link href={`/news/${item._id}`}>
                      <a className="post-cat cat-btn bg-color-blue-one">
                        {item.Category}
                      </a>
                    </Link>
                  </div>
                  <div className="axil-post-title hover-line">
                    <Link href={`/news/${item._id}`}>
                      <a>{item.Headline}</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterOne />
    </>
  );
};

export async function getServerSideProps(context) {
  const { category } = context.params;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db("db");

  const news = await db
    .collection("news_summaries")
    .find({ Category: category })
    .toArray();
  client.close();

  return {
    props: {
      news: news.map((document) => JSON.parse(JSON.stringify(document))),
    },
  };
}

export default CategoryPage;
