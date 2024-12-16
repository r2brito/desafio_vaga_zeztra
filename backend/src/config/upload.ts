import path from "path";
import multer, { StorageEngine } from "multer";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

interface IUploadConfig {
  driver: "disk";

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
  };
}

export default {
  driver: "disk",

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, "uploads"),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(_request, file, callback) {
        const fileName = `${Date.now()}-${file.originalname}`;
        return callback(null, fileName);
      }
    })
  },

  config: {
    disk: {}
  }
} as IUploadConfig;