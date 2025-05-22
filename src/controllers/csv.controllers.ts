import { upload } from "@/middlewares/file.middleware.js";
import { Request, Response } from "express";

export const uploadSingleFileController = [
  upload.single("image"),
  (req: Request, res: Response) => {
    console.log(req.file);
    res.send("File uploaded successfully");
  }
];

export const uploadMultipleFilesController = [
  upload.array("images", 3),
  (req: Request, res: Response) => {
    console.log(req.files);
    res.send("Files uploaded successfully");
  }
]