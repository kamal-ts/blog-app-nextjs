import React from "react";
import Pagination from "./Pagination";
import Image from "next/image";
import Link from "next/link";

const CardList = () => {
  return (
    <div className="sm:flex-[5] mt-12">
      <h1 className="text-xl font-bold mb-6 w-full">Popular Categories </h1>
      <div className="flex flex-col gap-4 mb-6">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Pagination />
    </div>
  );
};

export default CardList;

const Card = () => {
  return (
    <div className="card sm:card-side bg-base-100 shadow-sm hover:outline hover:outline-1">
      <figure className="min-h-60 relative flex-[1]">
        <Image src="/food.png" alt="Movie" fill className="object-cover" />
      </figure>
      <div className="card-body flex-[1]">
        <div>
          <span className="text-xs">11.02.2023 - </span>
          <span className="text-xs text-red-500">CULTURE</span>
        </div>
        <Link href={"/"} className="card-title">New movie is released!</Link>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe earum at dolores doloribus eligendi optio cupiditate natus soluta, ipsa labore!</p>
        <div className="card-actions justify-end">
          <Link href={"/"} className="link">Read More</Link>
        </div>
      </div>
    </div>
  );
};
