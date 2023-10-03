import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const cloudinaryUpload = async (file: string) => {
  const res = await cloudinary.uploader.upload(
    file,
    {
      resource_type: 'auto',
    },
    (result) => result
  );
  return res;
};

export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
});
