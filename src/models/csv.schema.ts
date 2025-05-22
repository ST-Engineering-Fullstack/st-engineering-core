import { Collection, MongoClient } from 'mongodb';

let client: MongoClient;
let uploadedFileCollection: Collection;

export const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('csv_upload');
    uploadedFileCollection = db.collection('uploaded_files');
    
    // Create indexes
    await uploadedFileCollection.createIndex({ originalName: 1 });
    await uploadedFileCollection.createIndex({ uploadedAt: 1 });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const getUploadedFileCollection = () => {
  if (!uploadedFileCollection) {
    throw new Error('Database not connected. Call connectToDatabase first.');
  }
  return uploadedFileCollection;
};

export const closeDatabaseConnection = async () => {
  if (client) {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
};
