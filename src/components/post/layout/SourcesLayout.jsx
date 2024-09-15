import React from "react";

// Define a mapping between source names and image paths
const imageSources = {
  "ARY News": "/images/news-sources/ARY.png",
  "arynews.tv": "/images/news-sources/ARY.png",
  Dawn: "/images/news-sources/dawn.png",
  "Dawn.com": "/images/news-sources/dawn.png",
  "thenews.com.pk": "/images/news-sources/thenews.png",
  "nation.com.pk": "/images/news-sources/TheNation.png",
  "The Tribune": "/images/news-sources/express_tribune.jpeg",
  Tribune: "/images/news-sources/express_tribune.jpeg",
  "The Nation": "/images/news-sources/TheNation.png",
  "Geo TV": "/images/news-sources/geo.png",
  "Geo News": "/images/news-sources/geo.png",
  "geo.tv": "/images/news-sources/geo.png",
  "tribune.com.pk": "/images/news-sources/express_tribune.jpeg",
};

const SourcesLayout = ({ news }) => {
  if (!news || !news.sources || news.sources.length === 0) {
    return (
      <div className="news-not-found text-center py-10">No news found.</div>
    );
  }

  return (
    <div className="news-article section-gap p-t-xs-15 p-t-sm-60">
      <h2 className="text-5xl font-bold mb-8 text-center">News Sources</h2>
      <div className="news-sources grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.sources.map((source, index) => {
          // Determine the image source based on the source name
          const imgSrc =
            imageSources[source.SourceName] ||
            "/images/news-sources/default.png"; // Fallback image if source name not found

          // Determine keyfacts field name and format it
          const keyfacts = source.keyfacts || "No key facts available.";
          const formattedKeyfacts =
            typeof keyfacts === "string"
              ? keyfacts.split("|").map((fact) => fact.trim())
              : [];

          // Log for debugging
          console.log("Source:", source);
          console.log("Key Facts:", keyfacts);
          console.log("Formatted Key Facts:", formattedKeyfacts);

          return (
            <div
              key={index}
              className="source-item border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative group p-4">
                <img
                  src={imgSrc}
                  alt={source.SourceName}
                  className="image w-auto h-[150px] mx-auto object-cover"
                />
                <div className="middle absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60">
                  <div className="text text-white text-lg font-semibold text-center px-2">
                    {source.SourceName}
                  </div>
                </div>
              </div>
              <div className="p-4 mx-auto items-center flex justify-center">
                <a
                  href={source.SourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-words"
                >
                  <span className="mx-auto items-center text-4xl font-bold">
                    {source.SourceName}
                  </span>
                </a>
              </div>
              {/* Display key facts */}
              <div className="p-4 bg-gray-100 text-gray-700">
                <h3 className="text-lg font-semibold mb-2">Key Facts</h3>
                <ul className="list-disc pl-5 text-sm leading-relaxed">
                  {formattedKeyfacts.length > 0 ? (
                    formattedKeyfacts.map((fact, factIndex) => (
                      <li key={factIndex}>{fact}</li>
                    ))
                  ) : (
                    <li>No key facts available.</li>
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SourcesLayout;
