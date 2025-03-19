import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

interface FileData {
  size: number;
  name: string;
  data: Buffer;
  image?: FileData;
}

const validationImage = (file: FileData): void => {
  const fileSize = file.size;
  const ext = path.extname(file.name);
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLocaleLowerCase())) {
    throw new Error("File type not allowed");
  }
  if (fileSize > 5000000) {
    throw new Error("File size exceeds the limit of 5MB");
  }
};

const uploadImageToCloud = async (file: string): Promise<UploadApiResponse | null> => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      folder: 'posts',
    });

    console.log("result", result);
    return result;
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Image upload failed");
  }
};

export { uploadImageToCloud, cloudinary, validationImage };
