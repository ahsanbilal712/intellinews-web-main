import React, { useEffect, useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";

// Utility function to format the time ago
function formatTimeAgo(createdAt) {
  const now = new Date();
  const diff = Math.abs(now - new Date(createdAt)); // Difference in milliseconds
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `published just now`;
  } else if (minutes < 60) {
    return `published ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (hours < 24) {
    return `published ${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    return `published ${days} ${days === 1 ? "day" : "days"} ago`;
  }
}

const NewsTopicsSection = ({ newsData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [followedTopics, setFollowedTopics] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load followed topics from local storage on component mount
    const savedTopics = JSON.parse(localStorage.getItem('followedTopics')) || [];
    setFollowedTopics(savedTopics);
  }, []);

  const handleAddTopic = (topic) => {
    if (topic && !followedTopics.includes(topic)) {
      const updatedTopics = [...followedTopics, topic];
      setFollowedTopics(updatedTopics);
      localStorage.setItem('followedTopics', JSON.stringify(updatedTopics));
      setSearchTerm("");
    }
  };

  const handleRemoveTopic = (topic) => {
    const updatedTopics = followedTopics.filter(t => t !== topic);
    setFollowedTopics(updatedTopics);
    localStorage.setItem('followedTopics', JSON.stringify(updatedTopics));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      handleAddTopic(searchTerm.trim());
    }
  };

  // Sort news by latest first
  const sortedNewsData = [...newsData].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="container mx-auto py-8">
      {/* Improved Search Bar */}
      <div className="mb-6 flex justify-center">
        <div className={`relative w-full max-w-md ${isInputFocused ? 'ring-2 ring-blue-400' : ''}`}>
          <div className="flex items-center bg-white rounded-full shadow-md transition-all duration-300">
            <FiSearch className="text-gray-400 ml-4 mr-2" size={20} />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              className="w-full py-3 px-2 rounded-full focus:outline-none bg-transparent"
            />
            <button
              onClick={() => handleAddTopic(searchTerm.trim())}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
            >
              <FiPlus size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Followed Topics */}
      {followedTopics.length > 0 && (
        <div className="mb-6 flex flex-wrap">
          {followedTopics.map((topic, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full mr-2 mb-2 transition-all duration-300 hover:bg-blue-600"
            >
              <span>{topic}</span>
              <button
                onClick={() => handleRemoveTopic(topic)}
                className="ml-2 text-lg leading-none focus:outline-none hover:text-red-300"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {followedTopics.length === 0 ? (
          <div className="text-center text-gray-500">Please add topics to display relevant news.</div>
        ) : (
          followedTopics.map((topic, index) => (
            <TopicNews
              key={index}
              topic={topic}
              news={sortedNewsData.filter(
                (newsItem) => newsItem.Headline && newsItem.Headline.toLowerCase().includes(topic.toLowerCase())
              )}
            />
          ))
        )}
      </div>
    </div>
  );
};

const TopicNews = ({ topic, news }) => {
  const router = useRouter();

  const handleNewsClick = (e, headline) => {
    e.preventDefault();
    const url = `/news/${encodeURIComponent(headline)}`;
    router.push(url).then(() => {
      window.location.href = url; // Force a full page reload
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-3xl flex justify-center font-bold mb-4">
        {topic}
      </h2>
      <hr className="text-lg h-1 w-full bg-slate-600 mb-4" />
      {news.length > 0 ? (
        news.slice(0, 3).map((item) => (
          <div className="flex flex-row p-4" key={item._id}>
            <Link href={`/news/${encodeURIComponent(item.Headline)}`}>
              <a 
                className="flex-shrink-0 cursor-pointer"
                onClick={(e) => handleNewsClick(e, item.Headline)}
              >
                <div className="w-32 h-32 -mt-3 overflow-hidden group">
                  <img
                    src={item.image_url}
                    alt={item.Headline}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                  />
                </div>
              </a>
            </Link>

            <div className="media-body px-4 flex flex-col justify-between">
              <Link href={`/news/${encodeURIComponent(item.Headline)}`}>
                <a 
                  className="text-xl font-bold -mt-4 cursor-pointer group"
                  style={{ lineHeight: "1.3" }}
                  onClick={(e) => handleNewsClick(e, item.Headline)}
                >
                  <span className="text-black bg-gradient-to-r mt-1 from-black to-black bg-no-repeat [background-position:0_88%] [background-size:0%_2px] group-hover:[background-size:100%_2px] transition-all py-1 duration-300">
                    {item.Headline}
                  </span>
                </a>
              </Link>
              <div className="text-lg mt-1">{formatTimeAgo(item.created_at)}</div>
            </div>
          </div>
        ))
      ) : (
        <div>No news found for this topic.</div>
      )}
    </div>
  );
};

export default NewsTopicsSection;