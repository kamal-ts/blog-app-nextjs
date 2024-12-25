const data = [
    {
        "name": "Risa Amelia",
        "email": "risaamelia28@gmail.com",
        "emailVerified": null,
        "image": "https://lh3.googleusercontent.com/a/ACg8ocJPJart7YqUH5xl7cbgjBKCAmhGY-2"
    },
    {
        "name": "Budi Santoso",
        "email": "budisantoso11@gmail.com",
        "emailVerified": null,
        "image": "https://lh3.googleusercontent.com/a/ACg8ocJPJart7YqUH5xl7cbgjBKCAmhGY-3"
    },
    {
        "name": "Nina Permata",
        "email": "ninapermata45@gmail.com",
        "emailVerified": null,
        "image": "https://lh3.googleusercontent.com/a/ACg8ocJPJart7YqUH5xl7cbgjBKCAmhGY-4"
    },
    {
        "name": "Arif Wibowo",
        "email": "arifwibowo78@gmail.com",
        "emailVerified": null,
        "image": "https://lh3.googleusercontent.com/a/ACg8ocJPJart7YqUH5xl7cbgjBKCAmhGY-5"
    },
    {
        "name": "Dewi Lestari",
        "email": "dewilestari92@gmail.com",
        "emailVerified": null,
        "image": "https://lh3.googleusercontent.com/a/ACg8ocJPJart7YqUH5xl7cbgjBKCAmhGY-6"
    },
    {
        "name": "Yusuf Rahman",
        "email": "yusufrahman55@gmail.com",
        "emailVerified": null,
        "image": "https://lh3.googleusercontent.com/a/ACg8ocJPJart7YqUH5xl7cbgjBKCAmhGY-7"
    },
    {
        "name": "Laila Kusuma",
        "email": "lailakusuma63@gmail.com",
        "emailVerified": null,
        "image": "https://lh3.googleusercontent.com/a/ACg8ocJPJart7YqUH5xl7cbgjBKCAmhGY-8"
    },
    {
        "name": "Adi Nugroho",
        "email": "adinugroho88@gmail.com",
        "emailVerified": null,
        "image": "https://lh3.googleusercontent.com/a/ACg8ocJPJart7YqUH5xl7cbgjBKCAmhGY-9"
    },
    {
        "name": "Siti Marlina",
        "email": "sitimarlina76@gmail.com",
        "emailVerified": null,
        "image": "https://lh3.googleusercontent.com/a/ACg8ocJPJart7YqUH5xl7cbgjBKCAmhGY-10"
    }
];  


import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {


    try {
        const rest = await prisma.user.createMany({ data: data })
        return NextResponse.json(rest, { status: 200 });
    } catch (error) {
        console.log("error", error);
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
};