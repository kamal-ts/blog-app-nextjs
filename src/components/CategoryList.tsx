"use client";

import { useCategoryStore } from "@/store/useCategoryStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const CategoryList = () => {
  const { categories, getCategory } = useCategoryStore();

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  return (
    <div className="mt-12">
      <h1 className="text-xl font-bold mb-6">Popular Categories </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories?.map((item) => (
          <Link href={"/"} className={` btn`} key={item.id}>
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

// const ListCategory: React.FC<{
//   href: string;
//   color?: string;
//   title: string;
//   image: string;
// }> = ({ href, title, image }) => {
//   return (
//     <Link href={href} className={` btn`}>
//       <div className="w-8 h-8 relative">
//         <Image
//           fill
//           src={image}
//           alt={title}
//           className="rounded-full object-cover border-2 border-white"
//         />
//       </div>
//       {title}
//     </Link>
//   );
// };
