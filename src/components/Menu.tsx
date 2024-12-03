import Image from "next/image";
import Link from "next/link";
import React from "react";

const Menu = () => {
  return (
    <div className="flex-[2] mt-12">
      <h2 className="text-sm">{"What's hot"}</h2>
      <h1 className="text-xl font-bold mb-6 w-full">Popular Categories </h1>
      <CartItem
        author="jhon doe"
        category="travel"
        date="01.13.2024"
        title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        href="/"
      />
      <CartItem
        author="jhon doe"
        category="travel"
        date="01.13.2024"
        title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        href="/"
      />
      <CartItem
        author="jhon doe"
        category="travel"
        date="01.13.2024"
        title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        href="/"
      />

      <h2 className="text-sm mt-12">{"Discover by topic"}</h2>
      <h1 className="text-xl font-bold mb-6 w-full">Categories</h1>

      <div className="flex flex-wrap gap-4">
        <PopularCategory href="/" color="bg-red-100" title="coding" />
        <PopularCategory href="/" color="bg-yellow-100" title="style" />
        <PopularCategory href="/" color="bg-green-100" title="fashion" />
        <PopularCategory href="/" color="bg-orange-100" title="food" />
        <PopularCategory href="/" color="bg-sky-100" title="travel" />
        <PopularCategory href="/" color="bg-purple-100" title="culture" />
      </div>

      <h2 className="text-sm mt-12">{"Chosen by the editor"}</h2>
      <h1 className="text-xl font-bold mb-6 w-full">Editor Pick </h1>

      <CartItem
        author="jhon doe"
        category="travel"
        date="01.13.2024"
        title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        href="/"
        image="/coding.png"
      />
      <CartItem
        author="jhon doe"
        category="travel"
        date="01.13.2024"
        title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        href="/"
        image="/coding.png"
      />
      <CartItem
        author="jhon doe"
        category="travel"
        date="01.13.2024"
        title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        href="/"
        image="/coding.png"
      />
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
      href={href}
      className={`py-2 px-5 ${color} rounded-lg text-xs hover:brightness-95 transition-all capitalize`}
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
  author: string;
  date: string;
}> = ({ href, title, image, category, author, date }) => {
  return (
    <Link href={href} className="flex gap-4 items-center mb-4 rounded-lg hover:shadow-lg p-2 transition-all">
      {image && (
        <div className="w-14 h-14 relative">
          <Image
            fill
            src={image}
            alt={"image"}
            className="rounded-full object-cover outline outline-2 outline-offset-1 outline-slate-200"
          />
        </div>
      )}
      <div className="flex-1">
        <div className="badge badge-primary text-[10px] capitalize mb-1">
          {category}
        </div>
        <p className="text-sm">{title}
        </p>
        <span className="capitalize text-[10px] text-primary">{author}</span>
        <span className="text-[10px] font-light"> - {date}</span>
      </div>
    </Link>
  );
};
