import { PostInterface, SearchParams } from "@/utils/interface";
import Pagination from "./Pagination";
import Image from "next/image";
import Link from "next/link";

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
  const limit = 5;
  const { posts, count } = await getData({ page, limit, category });
  // const hasNext = (limit * (page - 1 ) + limit) < count;
  // const hasPrev = (limit * (page - 1)) > 0;

  const hasNext = limit * page < count;
  const hasPrev = page > 1;
  return (
    <div className="sm:flex-[5] mt-12">
      <h1 className="text-xl font-bold mb-6 w-full">Recent Posts </h1>
      <div className="flex flex-col gap-4 mb-6">
        {posts.map((item: PostInterface) => (
          <div
            key={item.id}
            className="card sm:card-side bg-base-100 shadow-md motion-preset-slide-right "
          >
            {item.img && (
              <figure className="min-h-60 relative flex-[1]">
                <Image
                  src={item.img}
                  alt="Movie"
                  fill
                  className="object-cover"
                />
              </figure>
            )}
            <div className="card-body flex-[1]">
              <div>
                <span className="text-xs mr-4">
                  {item.createdAt.substring(0, 10)}
                </span>
                <div
                  style={{ backgroundColor: item.cat.color }}
                  className="inline-block px-2 py-[3px] rounded-full text-[10px] text-slate-700 capitalize mb-1"
                >
                  {item.cat.title}
                </div>
              </div>
              <Link href={`/posts/${item.slug}`} className="card-title line-clamp-2">
                {item.title}
              </Link>
              <p className="line-clamp-3 text-sm">{item.desc}</p>
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
