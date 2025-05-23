// csv.controllers.ts
import { HTTP_STATUS } from "@/constants/httpStatus.js";
import { MESSAGE } from "@/constants/message.js";
import { upload } from "@/middlewares/file.middleware.js";
import { getUploadedFileCollection } from "@/models/csv.schema.js";
import { Request, RequestHandler, Response } from "express";

export const uploadSingleFileController: RequestHandler[] = [
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(HTTP_STATUS.BAD_REQUEST).send(MESSAGE.NO_FILE_UPLOADED);
        return;
      }

      const collection = getUploadedFileCollection();
      const fileDoc = {
        originalName: req.file.originalname,
        filename: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        data: req.file.buffer,
        uploadedAt: new Date()
      };

      const result = await collection.insertOne(fileDoc);

      res.status(HTTP_STATUS.CREATED).json({
        message: MESSAGE.FILE_SAVED_TO_DB,
        file: {
          _id: result.insertedId,
          originalName: fileDoc.originalName,
          filename: fileDoc.filename,
          mimeType: fileDoc.mimeType,
          size: fileDoc.size,
          uploadedAt: fileDoc.uploadedAt
        }
      });
    } catch (err) {
      console.error('Upload error:', err);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(MESSAGE.SERVER_ERROR);
    }
  }
];

export const uploadMultipleFilesController: RequestHandler[] = [
  upload.array("files", 3),
  async (req: Request, res: Response) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).send(MESSAGE.NO_FILES_UPLOADED);
        return;
      }

      const collection = getUploadedFileCollection();
      const fileDocs = files.map((file) => ({
        originalName: file.originalname,
        filename: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        data: file.buffer,
        uploadedAt: new Date()
      }));

      const result = await collection.insertMany(fileDocs);

      res.status(HTTP_STATUS.CREATED).json({
        message: MESSAGE.FILES_SAVED_TO_DB,
        files: result.insertedIds
      });
    } catch (err) {
      console.error(err);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(MESSAGE.SERVER_ERROR);
    }
  }
];

export const getFilesListController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const collection = getUploadedFileCollection();

    const currentPage = parseInt(req.query.currentPage as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const searchKeyword = req.query.searchKeyword as string || '';

    const skip = (currentPage - 1) * pageSize;

    const searchQuery = searchKeyword ? {
      $or: [
        { originalName: { $regex: searchKeyword, $options: 'i' } },
        { filename: { $regex: searchKeyword, $options: 'i' } }
      ]
    } : {};

    const total = await collection.countDocuments(searchQuery);

    const files = await collection
      .find(searchQuery)
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .project({
        _id: 1,
        originalName: 1,
        filename: 1,
        mimeType: 1,
        size: 1,
        uploadedAt: 1
      })
      .toArray();

    res.status(HTTP_STATUS.OK).json({
      currentPage,
      pageSize,
      searchKeyword,
      total,
      totalPages: Math.ceil(total / pageSize),
      files
    });
  } catch (err) {
    console.error('Error getting files list:', err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(MESSAGE.SERVER_ERROR);
  }
};
