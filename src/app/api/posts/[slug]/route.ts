/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthSession } from "@/utils/auth";
import cloudinary from "@/utils/cloudinary";
import prisma from "@/utils/connect";
import { postSchema } from "@/utils/validator";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const { slug } = params;
    try {
        const post = await prisma.post.update({
            where: { slug: slug },
            data: { views: { increment: 1 } },
            include: {
                user: {
                    select: {
                        image: true,
                        name: true,
                    }
                }
            }
        });
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.log("error", error);
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
};

export const PATCH = async (req: Request, { params }: { params: { slug: string } }) => {
    const mySession = await getAuthSession();
    if (!mySession || !mySession.user || !mySession.user.email) {
      return NextResponse.json(
        { message: "Not authenticated!" },
        { status: 401 }
      );
    }
  
    try {
      const { slug } = params;
  
      // Mendapatkan data dari FormData
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const title = formData.get("title")?.toString() || "";
      const desc = formData.get("desc")?.toString() || "";
      const content = formData.get("content")?.toString() || "";
      const catSlug = formData.get("catSlug")?.toString() || "";
  
      // Validasi data menggunakan Joi
      const validationResult = postSchema.validate({ title, desc, content, catSlug });
      if (validationResult.error) {
        return NextResponse.json(
          { error: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
  
      // Cari post berdasarkan slug
      const post = await prisma.post.findUnique({
        where: { slug: slug },
      });
  
      if (!post) {
        return NextResponse.json(
          { message: "Post not found!" },
          { status: 404 }
        );
      }
  
      let newImage: string | null = post.img;
  
      // Jika ada file baru, lakukan upload ke Cloudinary
      if (file) {
        // Jika ada gambar lama, hapus dari Cloudinary
        if (post.img) {
          const publicId = post.img.split('/').slice(-1)[0].split('.')[0];
          await cloudinary.uploader.destroy(`uploads/${publicId}`, (error, result) => {
            if (error) {
              console.error("Cloudinary delete error:", error);
              throw new Error("Failed to delete old image from Cloudinary");
            }
            console.log("Old image deleted:", result);
          });
        }
  
        // Upload gambar baru ke Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "uploads" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
  
          const reader = file.stream().getReader();
          const pump = async ({
            done,
            value,
          }: ReadableStreamReadResult<Uint8Array>) => {
            if (done) {
              stream.end();
              return;
            }
            stream.write(Buffer.from(value));
            reader.read().then(pump);
          };
  
          reader.read().then(pump);
        });
  
        newImage = (uploadResult as any).secure_url;
      }
  
      // Perbarui data post di database
      const updatedPost = await prisma.post.update({
        where: { slug: slug },
        data: {
          title,
          desc,
          content,
          catSlug,
          ...(newImage && { img: newImage }), // Update field img jika ada gambar baru
        },
      });
  
      return NextResponse.json(updatedPost, { status: 200 });
    } catch (error: any) {
      console.error("Update error:", error);
      return NextResponse.json(
        { error: error.message || "Something went wrong" },
        { status: 500 }
      );
    }
  };
  

export const DELETE = async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const mySession = await getAuthSession();
    if (!mySession || !mySession.user || !mySession.user.email) {
        return NextResponse.json(
            { message: "Not authenticated!" },
            { status: 401 }
        );
    }
    try {
        const { slug } = params;

        // Cari post berdasarkan slug
        const post = await prisma.post.findUnique({
            where: { slug: slug },
        });
        if (!post) {
            return NextResponse.json(
                { message: "Post not found!" },
                { status: 404 }
            );
        }

        // Periksa apakah post memiliki gambar
        if (post.img) {
            // Dapatkan public_id dari URL gambar Cloudinary
            const publicId = post.img.split('/').slice(-1)[0].split('.')[0];

            // Hapus gambar dari Cloudinary
            await cloudinary.uploader.destroy(`uploads/${publicId}`, (error, result) => {
                if (error) {
                    console.error("Cloudinary delete error:", error);
                    throw new Error("Failed to delete image from Cloudinary");
                }
                console.log("Cloudinary delete result:", result);
            });
        }

        await prisma.post.delete({
            where: { slug: slug }
        });
        return NextResponse.json({ message: "Deleting data was successfull" }, { status: 200 });
    } catch (error) {
        console.log("error", error);
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
};
