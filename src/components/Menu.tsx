import Link from "next/link";
import Avatar from "./Avatar";
import { CategoryInterface, PostInterface } from "@/utils/interface";
import React from "react";
import baseUrl from "@/utils/baseUrl";

const safeFetch = async (url: string) => {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed");
    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
};

const getData = () => safeFetch(`${baseUrl}/api/posts?views=true&limit=5`);
const getDataByEditorsChoice = () => safeFetch(`${baseUrl}/api/posts?editorsChoice=true&limit=5`);
const getDataCategories = () => safeFetch(`${baseUrl}/api/categories`);

const Menu = async () => {
  const [popularPosts, editorsChoices, categories] = await Promise.all([
    getData(),
    getDataByEditorsChoice(),
    getDataCategories(),
  ]);

  return (
    <div className="flex-[2] mt-12">
      <h2 className="text-sm">{"What's hot"}</h2>
      <h1 className="text-xl font-bold mb-6 w-full">Most Popular</h1>
      {popularPosts.posts.map((item: PostInterface) => (
        <CartItem
          key={item.id}
          author={item.user?.name || "Unknown"}
          category={item.cat?.title || "General"}
          color={item.cat?.color || "#ccc"}
          date={item.createdAt || new Date().toISOString()}
          title={item.title || "Untitled"}
          href={`/posts/${item.slug || ""}`}
        />
      ))}

      <h2 className="text-sm mt-12">{"Discover by topic"}</h2>
      <h1 className="text-xl font-bold mb-6 w-full">Categories</h1>

      <div className="flex flex-wrap gap-4">
        {categories.map((item: CategoryInterface) => (
          <PopularCategory
            href={item.slug}
            key={item.id}
            color={item.color}
            title={item.title}
          />
        ))}
      </div>

      <h2 className="text-sm mt-12">{"Chosen by the editor"}</h2>
      <h1 className="text-xl font-bold mb-6 w-full">Editor Pick </h1>

      {editorsChoices.posts.map((item: PostInterface) => (
        <CartItem
          key={item.id}
          author={item.user?.name || "Unknown"}
          category={item.cat?.title || "General"}
          color={item.cat?.color || "#ccc"}
          date={item.createdAt || new Date().toISOString()}
          title={item.title || "Untitled"}
          href={`/posts/${item.slug || ""}`}
          image={item.img}
        />
      ))}
    </div>
  );
};

export default Menu;

const PopularCategory: React.FC<{
  color: string;
  title: string;
  href: string;
}> = ({ color, title, href }) => {
  return (
    <Link
      href={`/blog?cat=${href}`}
      style={{ backgroundColor: color }}
      className={`py-2 px-5 rounded-lg text-xs text-slate-700 hover:brightness-95 transition-all capitalize`}
    >
      {title}
    </Link>
  );
};

const CartItem: React.FC<{
  href: string;
  color?: string;
  title: string;
  image?: string;
  category: string;
  author?: string;
  date: string;
}> = ({ href, title, image, category, author, date, color }) => {
  return (
    <Link
      href={href}
      className="flex gap-4 items-center rounded-lg hover:shadow-lg p-2 transition-all"
    >
      {image && <Avatar src={image} alt={title} />}
      <div className="flex-1">
        <div
          style={{ backgroundColor: color }}
          className="inline-block px-2 py-[3px] rounded-full text-[10px] text-slate-700 capitalize mb-1"
        >
          {category}
        </div>
        <p className="text-sm">{title}</p>
        <span className="capitalize text-[10px] text-primary">{author}</span>
        <span className="text-[10px] font-light">
          {" "}
          - {date.substring(0, 10)}
        </span>
      </div>
    </Link>
  );
};
