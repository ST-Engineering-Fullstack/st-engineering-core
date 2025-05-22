import cors from 'cors'
import express from 'express'
import databaseService from './src/services/database.service'

const app = express()
const PORT = 4000

// Middleware
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

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
