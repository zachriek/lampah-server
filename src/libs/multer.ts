import multer from 'multer';
import { cloudinaryStorage } from './cloudinary';

export const multerUpload = multer({
  storage: cloudinaryStorage,
});
