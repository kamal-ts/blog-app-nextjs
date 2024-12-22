import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    //   const title = searchParams.get("title") || ""; // Pencarian berdasarkan title
    //   const category = searchParams.get("category") || ""; // Pencarian berdasarkan category
    const page = parseInt(searchParams.get("page") || "1", 10); // Pagination: Halaman saat ini
    const limit = parseInt(searchParams.get("limit") || "2", 10); // Pagination: Jumlah per halaman
    const skip = (page - 1) * limit;
    const query = {
        take: limit,
        skip: skip,
    };
    try {
        const [posts, count] = await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count(),
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

// const data = [
//     {
//       "slug": "minimalist-living-room-ideas",
//       "title": "Minimalist Living Room Ideas",
//       "desc": "Explore these stylish minimalist ideas to transform your living room into a modern sanctuary.",
//       "img": "https://example.com/images/minimalist-living-room.jpg",
//       "views": 45,
//       "catSlug": "style",
//       "userEmail":"sandhikag36@gmail.com"
//     },
//     {
//       "slug": "top-5-ethnic-festivals",
//       "title": "Top 5 Ethnic Festivals Around the World",
//       "desc": "Immerse yourself in the colors and traditions of these must-see cultural festivals.",
//       "img": "https://example.com/images/ethnic-festivals.jpg",
//       "views": 80,
//       "catSlug": "culture",
//       "userEmail":"sandhikag36@gmail.com"
//     },
//     {
//       "slug": "fall-winter-fashion-trends-2024",
//       "title": "Fall-Winter Fashion Trends 2024",
//       "desc": "Stay ahead in style with these chic fall-winter fashion essentials.",
//       "img": "https://example.com/images/fall-winter-fashion.jpg",
//       "views": 120,
//       "catSlug": "fashion",
//       "userEmail":"sandhikag36@gmail.com"
//     },
//     {
//       "slug": "5-authentic-pasta-recipes",
//       "title": "5 Authentic Pasta Recipes to Try at Home",
//       "desc": "Bring Italian flavors to your kitchen with these delicious pasta recipes.",
//       "img": "https://example.com/images/pasta-recipes.jpg",
//       "views": 65,
//       "catSlug": "food",
//       "userEmail":"sandhikag36@gmail.com"
//     },
//     {
//       "slug": "javascript-promises-essentials",
//       "title": "JavaScript Promises Essentials",
//       "desc": "Learn how to handle asynchronous tasks effectively with JavaScript promises.",
//       "img": "https://example.com/images/js-promises.jpg",
//       "views": 200,
//       "catSlug": "coding",
//       "userEmail":"sandhikag36@gmail.com"
//     },
//     {
//       "slug": "hidden-gems-in-bali",
//       "title": "Hidden Gems in Bali",
//       "desc": "Discover the untouched beauty and secret spots in Bali for your next vacation.",
//       "img": "https://example.com/images/bali-hidden-gems.jpg",
//       "views": 95,
//       "catSlug": "travel",
//       "userEmail":"sandhikag36@gmail.com"
//     },
//     {
//       "slug": "sustainable-clothing-brands",
//       "title": "Sustainable Clothing Brands to Watch",
//       "desc": "Support eco-friendly fashion with these sustainable brands making a difference.",
//       "img": "https://example.com/images/sustainable-clothing.jpg",
//       "views": 75,
//       "catSlug": "style",
//       "userEmail":"sandhikag36@gmail.com"
//     },
//     {
//       "slug": "cultural-etiquette-in-japan",
//       "title": "Cultural Etiquette in Japan",
//       "desc": "Navigate Japanese customs and traditions with ease using this etiquette guide.",
//       "img": "https://example.com/images/japan-etiquette.jpg",
//       "views": 110,
//       "catSlug": "culture",
//       "userEmail":"sandhikag36@gmail.com"
//     },
//     {
//       "slug": "10-best-burger-places-in-nyc",
//       "title": "10 Best Burger Places in NYC",
//       "desc": "A must-read guide for foodies seeking the best burger joints in New York City.",
//       "img": "https://example.com/images/nyc-burgers.jpg",
//       "views": 150,
//       "catSlug": "food",
//       "userEmail":"sandhikag36@gmail.com"
//     },
//     {
//       "slug": "getting-started-with-react-hooks",
//       "title": "Getting Started with React Hooks",
//       "desc": "Understand the basics of React Hooks and build modern, functional components.",
//       "img": "https://example.com/images/react-hooks.jpg",
//       "views": 180,
//       "catSlug": "coding",
//       "userEmail": "sandhikag36@gmail.com"
//     }
//   ]

//   try {

//       const res = await prisma.post.createMany({data: data});
//       return NextResponse.json(res, { status: 200 });
//   } catch (error) {
//             console.log("error", error);
//     return NextResponse.json(
//     { message: "Something went wrong!" },
//     { status: 500 }
//     );
//   }
