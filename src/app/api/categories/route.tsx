import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const withProject = searchParams.get("withProject") || "";

  try {
    const categories = await prisma.category.findMany({
      where: {
        ...(withProject !== "true" && { slug: { not: "project" } }),
      },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
