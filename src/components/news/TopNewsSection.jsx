import React from "react";
import Link from "next/link";

// Utility function to format the time ago
function formatTimeAgo(createdAt) {
  const now = new Date();
  const diff = Math.abs(now - new Date(createdAt)); // Difference in milliseconds
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `Published Just Now`;
  } else if (minutes < 60) {
    return `Published About ${minutes} ${
      minutes === 1 ? "Minute" : "Minutes"
    } Ago`;
  } else if (hours < 24) {
    return `Published About ${hours} ${hours === 1 ? "Hour" : "Hours"} Ago`;
  } else {
    return `Published About ${days} ${days === 1 ? "Day" : "Days"} Ago`;
  }
}

const TopNewsSection = ({ news }) => {
  // Sort news items by the latest created_at date
  const sortedNews = [...news].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div className="recent-news-wrapper section-gap pt-4 lg:pt-16">
      <div className="container w-[1280px]">
        <div className=" mt-5 text-5xl font-bold">Top News</div>

        <div className="row">
          <div className="col-lg-6">
            {sortedNews.slice(0, 1).map((newsItem) => (
              <div className="flex flex-col py-4 mt-8" key={newsItem._id}>
                <Link href={`/news/${newsItem._id}`}>
                  <a className="flex-shrink-0">
                    <div className="w-full h-full overflow-hidden group">
                      <img
                        src={newsItem.image_url}
                        alt={newsItem.Headline}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                      />
                    </div>
                  </a>
                </Link>

                <div className="media-body flex flex-col justify-between">
                  <div className="post-cat-group px-4 -mt-[50px] mb-2 ">
                    <Link href={`/news/${newsItem._id}`}>
                      <a className="post-cat cat-btn bg-color-blue-one text-white px-3  ">
                        {newsItem.Category}
                      </a>
                    </Link>
                  </div>
                  <div
                    className="text-5xl hover-line font-bold mt-10"
                    style={{ lineHeight: "1.3" }}
                  >
                    <Link href={`/news/${newsItem._id}`}>
                      <a>{newsItem.Headline}</a>
                    </Link>
                  </div>
                  <div className="text-lg mt-1 flex justify-end">
                    {formatTimeAgo(newsItem.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-6 ">
            <div className="flex justify-end mr-20 hover-line">
              <Link href="/latest">View All</Link>
            </div>

            <div className="axil-recent-news">
              <div className="axil-content">
                {sortedNews.slice(1, 4).map((newsItem) => (
                  <div className="flex flex-row p-4 " key={newsItem._id}>
                    <Link href={`/news/${newsItem._id}`}>
                      <a className="flex-shrink-0">
                        <div className="w-64 h-52 overflow-hidden group">
                          <img
                            src={newsItem.image_url}
                            alt={newsItem.Headline}
                            className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                          />
                        </div>
                      </a>
                    </Link>

                    <div className="media-body px-4 flex flex-col justify-between">
                      <div className="post-cat-group mb-2">
                        <Link href={`/news/${newsItem._id}`}>
                          <a className="post-cat cat-btn bg-color-blue-one text-white px-3">
                            {newsItem.Category}
                          </a>
                        </Link>
                      </div>
                      <div
                        className="text-3xl hover-line font-bold -mt-4"
                        style={{ lineHeight: "1.3" }}
                      >
                        <Link href={`/news/${newsItem._id}`}>
                          <a>{newsItem.Headline}</a>
                        </Link>
                      </div>
                      <div className="text-lg mt-1">
                        {formatTimeAgo(newsItem.created_at)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNewsSection;
