import { Router } from 'express';
import { getFilesListController, uploadMultipleFilesController, uploadSingleFileController } from '../controllers/csv.controllers.js';

const csvRouter = Router();

// Upload routes
csvRouter.post('/upload', uploadSingleFileController);
csvRouter.post('/upload/multiple', uploadMultipleFilesController);

// Get files list route
csvRouter.get('/files', getFilesListController);

export default csvRouter; 