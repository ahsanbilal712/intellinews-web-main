import dbConnect from '../../../lib/mongodb';
import NewsSummary from '../../../models/NewsSummary';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const news = await NewsSummary.find({}); // Fetches all documents from the news_summaries collection
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}