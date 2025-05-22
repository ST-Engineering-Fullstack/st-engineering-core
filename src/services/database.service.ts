import dotenv from 'dotenv'
import { Db, MongoClient } from 'mongodb'

// Load environment variables
dotenv.config()

class DatabaseService {
  private client: MongoClient
  private db!: Db // Using definite assignment assertion
  private initialized: boolean = false

  constructor() {
    const uri =
      process.env.MONGODB_URI ||
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3cwax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

    if (!uri) {
      throw new Error('MongoDB URI is not defined')
    }

    this.client = new MongoClient(uri)
  }

  async connect() {
    if (!this.initialized) {
      try {
        // Connect to MongoDB
        await this.client.connect()

        // Initialize database
        this.db = this.client.db(process.env.DB_NAME)

        // Send a ping to confirm a successful connection
        await this.db.command({ ping: 1 })
        console.log('Successfully connected to MongoDB!')

        this.initialized = true
      } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        throw error
      }
    }
  }
}

const databaseService = new DatabaseService()
export default databaseService
