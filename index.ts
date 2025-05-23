import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import csvRoutes from './src/routes/csvRoutes.js'
import databaseService from './src/services/database.service.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false,
  preflightContinue: false,
  optionsSuccessStatus: 204
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', csvRoutes)

const startServer = async () => {
  try {
    await databaseService.connect()
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
