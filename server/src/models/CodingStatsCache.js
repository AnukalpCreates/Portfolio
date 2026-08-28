import mongoose from 'mongoose';

const codingStatsCacheSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: 'coding_stats',
      trim: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    source: {
      type: String,
      enum: ['api', 'cache', 'fallback'],
      default: 'api',
    },
    lastFetched: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const CodingStatsCache = mongoose.model('CodingStatsCache', codingStatsCacheSchema);
