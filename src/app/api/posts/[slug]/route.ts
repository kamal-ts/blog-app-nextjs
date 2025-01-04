import { getAuthSession } from "@/utils/auth";
import cloudinary from "@/utils/cloudinary";
import prisma from "@/utils/connect";
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
