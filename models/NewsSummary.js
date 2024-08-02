import mongoose from 'mongoose';

// Define the schema with only the created_at timestamp
const newsSummarySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    Headline: String,
    Category: String,  // Add Category field
    Summary: String,
    sources: [
      {
        SourceName: String,
        SourceUrl: String
      }
    ],
    Image_source_name: String,
    image_url: String,
    created_at: {
      type: Date,
      default: Date.now, // Automatically set the created_at field to the current date
    }
  },
  {
    collection: 'news_summaries',
    // Disable automatic updatedAt field
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false
    }
  }
);

const NewsSummary = mongoose.models.NewsSummary || mongoose.model('NewsSummary', newsSummarySchema);

export default NewsSummary;
