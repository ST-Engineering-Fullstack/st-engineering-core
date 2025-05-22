import { Collection } from 'mongodb';
import databaseService from '../services/database.service.js';

export interface IUploadedFile {
  originalName: string;
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
  uploadedAt: Date;
}

export const getUploadedFileCollection = (): Collection<IUploadedFile> => {
  return databaseService.getUploadedFileCollection();
};
