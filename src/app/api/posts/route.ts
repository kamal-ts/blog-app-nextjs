/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  
  const title = searchParams.get("title") || ""; // Pencarian berdasarkan title
  const category = searchParams.get("category") || ""; // Pencarian berdasarkan category
  const hot = searchParams.get("hot") === "true";
  const isEditorsChoice = searchParams.get("isEditorsChoice") === "true";
  const userEmail = searchParams.get("userEmail") || "";
  

  const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1); // Minimum 1
  const limit = Math.max(parseInt(searchParams.get("limit") || "2", 10), 1); // Minimum 1
  const skip = (page - 1) * limit;
  


  try {
    let posts, count;

    if (hot) {

      posts = await prisma.post.findMany({
        orderBy: {
          views: "desc",
        },
        take: 5,
        include: {
          user: true,
          cat: {
            select: {
              title: true,
              color: true
            }
          }
        }
      });
      count = posts.length;

    } else if (isEditorsChoice) {

      posts = await prisma.post.findMany({
        where: {
          isEditorsChoice: true
        },
        take: 5,
        include: {
          user: true,
          cat: {
            select: {
              title: true,
              color: true
            }
          }
        }
      });
      count = posts.length;

    } else {

      const query = {
        take: limit,
        skip: skip,
        where: {
          ...(category && { catSlug: category }),
          ...(title && { title }),
          ...(userEmail && { userEmail }),
        },
        include: {
          cat: {
            select: {
              title: true,
              color: true
            }
          }
        }
      };

      const [postsResult, countResult] = await prisma.$transaction([
        prisma.post.findMany({...query, orderBy: {
          createdAt: "desc"
        }}),
        prisma.post.count({ where: query.where }), // Filter untuk count
      ]);
      posts = postsResult;
      count = countResult;

    }

    return NextResponse.json({ posts, count }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};

import { v2 as cloudinary } from "cloudinary";
import { getAuthSession } from "@/utils/auth";

import slugify from "slugify";
import { postSchema } from "@/utils/validator";

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const config = {
  api: {
    bodyParser: false, // Perlu dinonaktifkan untuk menangani FormData
  },
};


const uniqueSlug =  async (title: string) => {
      // Generate slug
      const slug = slugify(title, { lower: true });

      // Pastikan slug unik
      let uniqueSlug = slug;
      let count = 1;
  
      while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${count}`;
        count++;
      }
  
      return uniqueSlug;
}

/**
 * POST Data
 */

export const POST = async (request: Request) => {
  const mySession = await getAuthSession();
  if (!mySession || !mySession.user || !mySession.user.email) {
    return NextResponse.json(
      { message: "Not authenticated!" },
      { status: 401 }
    );
  }

  try {
    // Mendapatkan data dari FormData
    const formData = await request.formData();
    const file = formData.get("file") as File;
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

    const slug = await uniqueSlug(title);
    
    let image: string | null = null;
    if (file) {
      // Upload ke Cloudinary menggunakan buffer
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

      image = (uploadResult as any).secure_url;
    }


    // Kirim respons URL gambar
    const post = await prisma.post.create({
      data: {
        slug: slug,
        catSlug: catSlug,
        title: title,
        desc: desc,
        content: content,
        userEmail: mySession.user.email,
        ...(image && { img: image }),
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
};
