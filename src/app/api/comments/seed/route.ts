const data = [
    {
      "createdAt": "2024-12-22T12:00:00Z",
      "desc": "Great insights on urban fashion!",
      "userEmail": "risaamelia28@gmail.com",
      "postSlug": "modern-street-style"
    },
    {
      "createdAt": "2024-12-22T13:00:00Z",
      "desc": "Love the photos!",
      "userEmail": "budisantoso11@gmail.com",
      "postSlug": "modern-street-style"
    },
    {
      "createdAt": "2024-12-22T14:00:00Z",
      "desc": "I want to visit these festivals!",
      "userEmail": "ninapermata45@gmail.com",
      "postSlug": "cultural-festivals-around-the-world"
    },
    {
      "createdAt": "2024-12-22T15:00:00Z",
      "desc": "Amazing compilation!",
      "userEmail": "arifwibowo78@gmail.com",
      "postSlug": "cultural-festivals-around-the-world"
    },
    {
      "createdAt": "2024-12-22T16:00:00Z",
      "desc": "Minimalism at its best!",
      "userEmail": "dewilestari92@gmail.com",
      "postSlug": "minimalist-fashion-guide"
    },
    {
      "createdAt": "2024-12-22T17:00:00Z",
      "desc": "Great tips for my wardrobe!",
      "userEmail": "yusufrahman55@gmail.com",
      "postSlug": "minimalist-fashion-guide"
    },
    {
      "createdAt": "2024-12-22T18:00:00Z",
      "desc": "Now I’m hungry!",
      "userEmail": "lailakusuma63@gmail.com",
      "postSlug": "best-street-foods-asia"
    },
    {
      "createdAt": "2024-12-22T19:00:00Z",
      "desc": "Street food is the best food!",
      "userEmail": "adinugroho88@gmail.com",
      "postSlug": "best-street-foods-asia"
    },
    {
      "createdAt": "2024-12-22T20:00:00Z",
      "desc": "This helped me understand hooks better!",
      "userEmail": "sitimarlina76@gmail.com",
      "postSlug": "intro-to-react-hooks"
    },
    {
      "createdAt": "2024-12-22T21:00:00Z",
      "desc": "Clear and concise explanation!",
      "userEmail": "risaamelia28@gmail.com",
      "postSlug": "intro-to-react-hooks"
    },
    {
      "createdAt": "2024-12-22T22:00:00Z",
      "desc": "I’ve added these to my bucket list!",
      "userEmail": "budisantoso11@gmail.com",
      "postSlug": "hidden-travel-gems"
    },
    {
      "createdAt": "2024-12-22T23:00:00Z",
      "desc": "These places look amazing!",
      "userEmail": "ninapermata45@gmail.com",
      "postSlug": "hidden-travel-gems"
    },
    {
      "createdAt": "2024-12-23T00:00:00Z",
      "desc": "This is so inspiring!",
      "userEmail": "arifwibowo78@gmail.com",
      "postSlug": "modern-street-style"
    },
    {
      "createdAt": "2024-12-23T01:00:00Z",
      "desc": "Can't wait to try this style!",
      "userEmail": "dewilestari92@gmail.com",
      "postSlug": "modern-street-style"
    },
    {
      "createdAt": "2024-12-23T02:00:00Z",
      "desc": "Beautifully written!",
      "userEmail": "yusufrahman55@gmail.com",
      "postSlug": "cultural-festivals-around-the-world"
    },
    {
      "createdAt": "2024-12-23T03:00:00Z",
      "desc": "This makes me want to travel more!",
      "userEmail": "lailakusuma63@gmail.com",
      "postSlug": "cultural-festivals-around-the-world"
    },
    {
      "createdAt": "2024-12-23T04:00:00Z",
      "desc": "Fashionable and sustainable!",
      "userEmail": "adinugroho88@gmail.com",
      "postSlug": "minimalist-fashion-guide"
    },
    {
      "createdAt": "2024-12-23T05:00:00Z",
      "desc": "Great guide for beginners!",
      "userEmail": "sitimarlina76@gmail.com",
      "postSlug": "minimalist-fashion-guide"
    },
    {
      "createdAt": "2024-12-23T06:00:00Z",
      "desc": "I’m craving street food now!",
      "userEmail": "risaamelia28@gmail.com",
      "postSlug": "best-street-foods-asia"
    },
    {
      "createdAt": "2024-12-23T07:00:00Z",
      "desc": "The flavors must be incredible!",
      "userEmail": "budisantoso11@gmail.com",
      "postSlug": "best-street-foods-asia"
    }
  ]
  ;


import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {


    try {
        const rest = await prisma.comment.createMany({ data: data })
        return NextResponse.json(rest, { status: 200 });
    } catch (error) {
        console.log("error", error);
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
};