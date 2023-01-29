import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';

class UploadImagesMiddlewares {

  private  storageMulter() {
    return multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '..', '..', 'public', 'images'));
      },
      filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
      }
    });
  }

  uploadImages() {
    return multer({
      storage: this.storageMulter(),
      fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image')) {
          callback(null, true);
        } else {
          callback(new Error('Unsupported file format'));
        }
      },
      limits: {
        fieldSize: 2000000
      }
    });
  }

  public imgResize(width?: number, height?: number) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.files?.length || !Array.isArray( req.files)) throw new Error("File nod found");
        await Promise.all(
          req.files.map(async (file) => {
            await sharp(file.path).resize(width || 300, height || 300).toFile(`public/images/${"resize-"+file.filename}`)
            fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'images', file.filename))
          })
        );
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}

const uploadImagesMiddlewares = new UploadImagesMiddlewares();
export default uploadImagesMiddlewares

