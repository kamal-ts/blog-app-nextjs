/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || ""; // Pencarian berdasarkan title
  const category = searchParams.get("category") || ""; // Pencarian berdasarkan category
  const hot = searchParams.get("hot") === "true";
  const isEditorsChoice = searchParams.get("isEditorsChoice") === "true";
  const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1); // Minimum 1
  const limit = Math.max(parseInt(searchParams.get("limit") || "2", 10), 1); // Minimum 1
  const skip = (page - 1) * limit;


  try {
    let posts, count;

    if (hot) {

      posts = await prisma.post.findMany({
        orderBy: {
          views: "desc"
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
      
    }else {

      const query = {
        take: limit,
        skip: skip,
        where: {
          ...(category && { catSlug: category }),
          ...(title && { title: title }),
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
        prisma.post.findMany(query),
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
    const title = formData.get("title");
    const desc = formData.get("desc");

    console.table({ title, desc });

    // Menangani nilai null atau non-string pada title dan desc
    if (typeof title !== "string" || typeof desc !== "string") {
      return NextResponse.json(
        { error: "Title and Description must be strings" },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

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

    const slug = slugify(title); // Buat slug dari judul
    const catSlug = "fashion"; // Contoh slug kategori

    // Kirim respons URL gambar
    console.table({ url: (uploadResult as any).secure_url });
    const post = await prisma.post.create({
      data: {
        slug: slug,
        catSlug: catSlug,
        title: title,
        desc: desc,
        userEmail: mySession.user.email,
        img: (uploadResult as any).secure_url,
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

// return NextResponse.json({ url: (uploadResult as any).secure_url });

// export const config = {
//     api: {
//         bodyParser: false, // Nonaktifkan bodyParser bawaan Next.js
//     },
// };

// // Helper untuk mengonversi Next.js request ke Node.js Readable stream
// async function toNodeReadable(req: NextRequest): Promise<Readable> {
//     const readable = new Readable();
//     readable._read = () => {}; // No-op

//     const body = await req.body?.getReader().read();
//     if (body && body.value) {
//       readable.push(Buffer.from(body.value));
//     }
//     readable.push(null); // End stream
//     return readable;
//   }

// export const POST = async (req: NextRequest) => {
//     const mySession = await getAuthSession();
//     if (!mySession || !mySession.user || !mySession.user.email) {
//         return NextResponse.json(
//             { message: "Not authenticated!" },
//             { status: 401 }
//         );
//     }

//     try {
//         const form = formidable({ multiples: true });

//         // Convert Next.js request to Node.js readable stream
//         const nodeReq = toNodeReadable(req);

//         const { fields, files }: any = await new Promise((resolve, reject) => {
//             form.parse(nodeReq as any, (err, fields, files) => {
//                 if (err) reject(err);
//                 resolve({ fields, files });
//             });
//         });

//         const file = files.image; // Pastikan ini cocok dengan field pada frontend
//         let imageUrl = "";

//         if (file) {
//             const uploadResult = await cloudinary.uploader.upload(file.filepath, {
//                 folder: "nextjs_uploads",
//             });
//             imageUrl = uploadResult.secure_url;
//         }

//         const post = await prisma.post.create({
//             data: {
//                 ...fields,
//                 userEmail: mySession.user.email,
//                 img: imageUrl,
//             },
//         });

//         return NextResponse.json(post, { status: 200 });
//     } catch (error) {
//         console.error("Error creating post:", error);
//         return NextResponse.json(
//             { message: "Something went wrong!" },
//             { status: 500 }
//         );
//     }
// };
