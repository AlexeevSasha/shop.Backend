import { v2 } from 'cloudinary';

class Cloudinary {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET
    });
  }

  async uploadImg(file: string) {
    return await v2.uploader.upload(file, { resource_type: 'auto' });
  }
}

const cloudinary = new Cloudinary();

export default cloudinary;
