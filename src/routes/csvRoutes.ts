import { uploadMultipleFilesController, uploadSingleFileController } from '@/controllers/csv.controllers.js';
import { Router } from 'express';

const csvRouter = Router();

csvRouter.post('/upload-single', uploadSingleFileController)
csvRouter.post("/upload-multiple", uploadMultipleFilesController); 


export default csvRouter; 