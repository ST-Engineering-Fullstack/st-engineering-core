# ST Engineering Backend Application

A robust Node.js backend application built with Express and TypeScript for handling CSV file processing and management.

## Features

- CSV file upload and processing
- MongoDB database integration
- RESTful API endpoints
- File validation and error handling
- CORS support
- Request logging with Morgan
- View CSV Files Uploaded
- Upload Single/Multiple Files

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Multer (file upload)
- CORS
- Morgan (logging)

## Prerequisites

- Node.js (v18 or higher)
- MongoDB instance
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd st-engineering-core
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
MONGODB_DATABASE=your_database_name
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The server will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run prettier` - Check code formatting
- `npm run prettier:fix` - Fix code formatting

## API Endpoints

### CSV Management

- `POST /upload` - Upload a single CSV file
- `POST /upload/multiple` - Upload multiple CSV files
- `GET /files` - Get list of uploaded files
  - Query parameters:
    - `currentPage` (default: 1)
    - `pageSize` (default: 10)
    - `searchKeyword` (optional)

## Project Structure

```
src/
├── constants/     # Application constants
├── controllers/   # Route controllers
├── middlewares/   # Express middlewares
├── models/        # Database models
├── routes/        # API routes
├── services/      # Business logic
└── index.ts       # Application entry point
```

## Development Guidelines

1. Follow TypeScript best practices
2. Use async/await for asynchronous operations
3. Implement proper error handling
4. Write clean and maintainable code
5. Follow the existing code style
6. Add appropriate logging
7. Write meaningful commit messages

## Database Schema

### UploadedFile Collection

```typescript
interface IUploadedFile {
  originalName: string;
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
  uploadedAt: Date;
}
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

ISC 