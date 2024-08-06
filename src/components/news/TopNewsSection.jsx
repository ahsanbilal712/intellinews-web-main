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
      <div className="container mx-auto w-full lg:w-[1280px]">
        <div className="mt-5 mb-2 text-2xl lg:text-5xl font-bold">Top News</div>

        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2 mb-8 mt-3 lg:mb-0">
            {sortedNews.slice(0, 1).map((newsItem) => (
              <div className="flex flex-col py-4" key={newsItem._id}>
                <Link href={`/news/${newsItem._id}`}>
                  <a className="flex-shrink-0">
                    <div className="w-full h-96 lg:h-full overflow-hidden group">
                      <img
                        src={newsItem.image_url}
                        alt={newsItem.Headline}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                      />
                    </div>
                  </a>
                </Link>

                <div className="media-body flex flex-col justify-between">
                  <div className="post-cat-group px-4 -mt-20 lg:-mt-[50px] mb-2">
                    <Link href={`/news/${newsItem._id}`}>
                      <a className="post-cat cat-btn bg-color-blue-one text-white px-3">
                        {newsItem.Category}
                      </a>
                    </Link>
                  </div>
                  <div
                    className="text-xl lg:text-5xl hover-line font-bold mt-4 lg:mt-10"
                    style={{ lineHeight: "1.3" }}
                  >
                    <Link href={`/news/${newsItem._id}`}>
                      <a>{newsItem.Headline}</a>
                    </Link>
                  </div>
                  <div className="text-sm lg:text-lg mt-2 flex ">
                    {formatTimeAgo(newsItem.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex justify-end mr-4 lg:mr-20 hover-line">
              <Link href="/latest">
                <a className="text-sm lg:text-2xl ">View All</a>
              </Link>
            </div>

            <div className="axil-recent-news">
              <div className="axil-content">
                {sortedNews.slice(1, 4).map((newsItem) => (
                  <div className="flex flex-row p-4 lg:p-4" key={newsItem._id}>
                    <Link href={`/news/${newsItem._id}`}>
                      <a className="flex-shrink-0">
                        <div className="w-48 h-36 lg:w-64 lg:h-52 overflow-hidden group">
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
                        className="text-xl lg:text-2xl hover-line font-bold -mt-8 lg:-mt-8"
                        style={{ lineHeight: "1.3" }}
                      >
                        <Link href={`/news/${newsItem._id}`}>
                          <a>{newsItem.Headline}</a>
                        </Link>
                      </div>
                      <div className="text-sm lg:text-lg mt-1 ">
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
