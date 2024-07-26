import mongoose from 'mongoose';

const newsSummarySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Headline: String,
  Category: String,  // Add Category field
  Summary: String,
  sources: [{        // Define an array of sources with name and URL
    SourceName: String,
    SourceUrl: String
  }],
  Image_source_name: String,
  image_url: String
}, { collection: 'news_summaries' });

const NewsSummary = mongoose.models.NewsSummary || mongoose.model('NewsSummary', newsSummarySchema);

export default NewsSummary;
