// pages/api/sitemap.js
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  // Connect to MongoDB and fetch all news articles
  let client;
  try {
    client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db("intelli-news-db");
    const newsArticles = await db.collection("data_news").find().toArray();

    const baseUrl = "https://intellinewsai.netlify.app";

    // Construct the XML sitemap dynamically
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
      ${newsArticles
        .map((article) => {
          const articleUrl = `${baseUrl}/news/${encodeURIComponent(
            article.Headline
          )}`;
          return `
          <url>
            <loc>${articleUrl}</loc>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
          </url>
          `;
        })
        .join("")}
    </urlset>`;

    // Set the response header and send the sitemap XML
    res.setHeader("Content-Type", "application/xml");
    res.status(200).end(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).end("Error generating sitemap");
  } finally {
    if (client) {
      client.close();
    }
  }
}
