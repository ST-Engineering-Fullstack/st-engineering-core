import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import csvRoutes from './src/routes/csvRoutes.js'
import databaseService from './src/services/database.service.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', csvRoutes)

const startServer = async () => {
  try {
    await databaseService.connect()
    app.listen(PORT, () => {
      console.log(`Server is running on http://127.0.0.1:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
