import fs from "fs";
import multer from "multer";
import path from "path";
// Top of your file
import { fileURLToPath } from "url";

// Simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_DIR = path.join(__dirname, "..", "images");

// Create the directory if it doesn't exist
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, IMAGE_DIR);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const originalName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${timestamp}--${originalName}`);
  }
});

export const upload = multer({
    storage,
    limits: { files: 3 },
 });
