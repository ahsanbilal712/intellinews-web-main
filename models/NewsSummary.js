import mongoose from 'mongoose';

const newsSummarySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Headline: String,
  Summary: String
}, { collection: 'news_summaries' });

const NewsSummary = mongoose.models.NewsSummary || mongoose.model('NewsSummary', newsSummarySchema);

export default NewsSummary;
