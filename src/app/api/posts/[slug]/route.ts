import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const { slug } = params;
    try {
        const post = await prisma.post.update({
            where: { slug: slug },
            data: {views: {increment:1}},
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
