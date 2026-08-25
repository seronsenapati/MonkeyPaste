import mongoose from 'mongoose';

// Cache DB connection across warm function invocations (serverless best practice)
let cachedConnection = null;

export async function connectDB() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }
  cachedConnection = await mongoose.connect(process.env.MONGODB_URI);
  return cachedConnection;
}

// Paste model — defined once, reused if mongoose already has it cached
const PasteSchema = new mongoose.Schema({
  code:       { type: String, required: true, unique: true, index: true },
  content:    { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export const Paste = mongoose.models.Paste || mongoose.model('Paste', PasteSchema);
