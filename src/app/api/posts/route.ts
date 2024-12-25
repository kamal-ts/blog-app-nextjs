import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
// import { Prisma } from "@prisma/client";
export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || ""; // Pencarian berdasarkan title
    const category = searchParams.get("category") || ""; // Pencarian berdasarkan category
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1); // Minimum 1
    const limit = Math.max(parseInt(searchParams.get("limit") || "2", 10), 1); // Minimum 1
    const skip = (page - 1) * limit;

    // const where: Prisma.PostWhereInput = {};

    // if (title) {
    //     where.title = {
    //         contains: title,
    //         mode: Prisma.QueryMode.insensitive, // Gunakan Prisma.QueryMode
    //     };
    // }

    // if (cat) {
    //     where.catSlug = {
    //         contains: cat,
    //         mode: Prisma.QueryMode.insensitive, // Gunakan Prisma.QueryMode
    //     };
    // }

    const query = {
        take: limit,
        skip: skip,
        where: {
            ...(category && { catSlug: category }),
            ...(title && { title: title })
        }
        // where: Object.keys(where).length > 0 ? where : undefined, // Hanya tambahkan `where` jika ada filter
    };

    try {
        const [posts, count] = await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count({ where: query.where }), // Filter untuk count
        ]);
        return NextResponse.json({ posts, count }, { status: 200 });
    } catch (error) {
        console.log("error", error);
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
};