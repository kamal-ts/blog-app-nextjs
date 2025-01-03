import Link from "next/link";
import Avatar from "./Avatar";
import { CategoryInterface, PostInterface } from "@/utils/interface";
import React from "react";

const getData = async () => {
  const res = await fetch(`http://localhost:3000/api/posts?views=true&limit=5`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const getDataByEditorsChoice = async () => {
  const res = await fetch(`http://localhost:3000/api/posts?editorsChoice=true&limit=5`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
}

const getDataCategories = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const Menu = async () => {
  const { posts } = await getData();
  const dataByEditorsChoice = await getDataByEditorsChoice();
  const categories = await getDataCategories();

  return (
    <div className="flex-[2] mt-12">
      <h2 className="text-sm">{"What's hot"}</h2>
      <h1 className="text-xl font-bold mb-6 w-full">Most Popular</h1>
      {posts.map((item: PostInterface) => (
        <CartItem
          key={item.id}
          author={item.user?.name}
          category={item.cat.title}
          color={item.cat.color}
          date={item.createdAt}
          title={item.title}
          href="/"
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

      {dataByEditorsChoice.posts.map((item: PostInterface) => (
        <CartItem
        key={item.id}
        author={item.user?.name}
        category={item.cat.title}
        color={item.cat.color}
        date={item.createdAt}
        title={item.title}
        href="/"
        image="/coding.png"
        />
      )) }
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
        <p className="text-sm">
          {title}
        </p>
        <span className="capitalize text-[10px] text-primary">{author}</span>
        <span className="text-[10px] font-light">
          {" "}
          - {date.substring(0, 10)}
        </span>
      </div>
    </Link>
  );
};
