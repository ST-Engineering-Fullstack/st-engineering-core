import dotenv from 'dotenv';
import { Collection, MongoClient } from 'mongodb';
import { IUploadedFile } from '../models/csv.schema.js';

// Load environment variables
dotenv.config();

class DatabaseService {
  private static instance: DatabaseService;
  private client: MongoClient;
  private uploadedFileCollection!: Collection<IUploadedFile>;
  private isConnected: boolean = false;

  private constructor() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    this.client = new MongoClient(uri);
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async connect(): Promise<void> {
    if (!this.isConnected) {
      try {
        await this.client.connect();
        console.log('Connected to MongoDB Atlas');
        
        const db = this.client.db(process.env.MONGODB_DATABASE);
        this.uploadedFileCollection = db.collection<IUploadedFile>('uploaded_files');
        
        // Create indexes
        await this.uploadedFileCollection.createIndex({ originalName: 1 });
        await this.uploadedFileCollection.createIndex({ uploadedAt: 1 });
        
        this.isConnected = true;
      } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
      }
    }
  }

  public async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.close();
      this.isConnected = false;
      console.log('Disconnected from MongoDB');
    }
  }

  public getUploadedFileCollection(): Collection<IUploadedFile> {
    if (!this.isConnected) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.uploadedFileCollection;
  }
}

export default DatabaseService.getInstance();
