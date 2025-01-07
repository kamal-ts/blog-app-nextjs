
import { CategoryInterface } from "@/utils/interface";
import Image from "next/image";
import Link from "next/link";
import baseUrl from "@/utils/baseUrl";

const getData = async () => {
  const res = await fetch(`${baseUrl}/api/categories`, {cache: "no-store"});
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
}

const CategoryList = async () => {

  const data = await getData();

  return (
    <div className="mt-12">
      <h1 className="text-xl font-bold mb-6">Popular Categories </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        
        {data?.map((item: CategoryInterface) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={`motion-preset-expand btn`}
            key={item.id}
          >
            <div className="w-8 h-8 relative">
              <Image
                fill
                src={item.img}
                alt={item.title}
                className="rounded-full object-cover border-2 border-white"
              />
            </div>
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;