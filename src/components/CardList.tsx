import { PostInterface } from "@/utils/interface";
import Pagination from "./Pagination";
import Image from "next/image";
import Link from "next/link";

interface SearchParams {
  page: number;
  category: string;
  limit?: number;
}
const getData = async ({ page, limit, category }: SearchParams) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&limit=${limit}&category=${category}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};
const CardList: React.FC<SearchParams> = async ({ page, category }) => {
  const limit = 4;
  const { posts, count } = await getData({ page, limit, category });
  console.table({ page, category });
  // const hasNext = (limit * (page - 1 ) + limit) < count;
  // const hasPrev = (limit * (page - 1)) > 0;

  const hasNext = limit * page < count;
  const hasPrev = page > 1;

  console.log("posts", posts);

  return (
    <div className="sm:flex-[5] mt-12">
      <h1 className="text-xl font-bold mb-6 w-full">Recent Posts </h1>
      <div className="flex flex-col gap-4 mb-6">
        {posts.map((item: PostInterface) => (
          <div
            key={item.id}
            className="card sm:card-side bg-base-100 shadow-md"
          >
            {item.img && (
              <figure className="min-h-60 relative flex-[1]">
                <Image
                  src={"/p1.jpeg"}
                  alt="Movie"
                  fill
                  className="object-cover"
                />
              </figure>
            )}
            <div className="card-body flex-[1]">
              <div>
                <span className="text-xs">{item.createdAt.substring(0, 10)} - </span>
                <span className="text-xs text-red-500">{item.catSlug}</span>
              </div>
              <Link href={`/posts/${item.slug}`} className="card-title">
                {item.title}
              </Link>
              <p>{item.desc.substring(0, 60)}</p>
              <div className="card-actions justify-end">
                <Link href={`/posts/${item.slug}`} className="link">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} />
    </div>
  );
};

export default CardList;

// const Card = () => {
//   return (
//     <div className="card sm:card-side bg-base-100 shadow-sm hover:outline hover:outline-1">
//       <figure className="min-h-60 relative flex-[1]">
//         <Image src="/food.png" alt="Movie" fill className="object-cover" />
//       </figure>
//       <div className="card-body flex-[1]">
//         <div>
//           <span className="text-xs">11.02.2023 - </span>
//           <span className="text-xs text-red-500">CULTURE</span>
//         </div>
//         <Link href={"/"} className="card-title">New movie is released!</Link>
//         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe earum at dolores doloribus eligendi optio cupiditate natus soluta, ipsa labore!</p>
//         <div className="card-actions justify-end">
//           <Link href={"/"} className="link">Read More</Link>
//         </div>
//       </div>
//     </div>
//   );
// };
