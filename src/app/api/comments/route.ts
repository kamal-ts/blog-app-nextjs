import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const postSlug = searchParams.get("postSlug") || undefined;

    try {
        const rest = await prisma.comment.findMany({
            where: { ...(postSlug && { postSlug }) },
            include: {
                user: {
                    select: {
                        image: true,
                        name: true,
                    }
                }
            }
        })
        return NextResponse.json(rest, { status: 200 });
    } catch (error) {
        console.log("error", error);
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
};
export const POST = async (req: NextRequest) => {

    const mySession = await getAuthSession();
    if (!mySession || !mySession.user || !mySession.user.email) {
        return NextResponse.json(
            { message: "Not authenticated!" },
            { status: 401 }
        );
    }


    try {
        const body = await req.json()
        const comment = await prisma.comment.create({
            data: {
                ...body,
                userEmail: mySession.user.email
            }
        })
        return NextResponse.json(comment, { status: 200 });
    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
};