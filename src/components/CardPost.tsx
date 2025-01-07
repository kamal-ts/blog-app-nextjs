import { PostInterface, SearchParams } from "@/utils/interface";
import Pagination from "./Pagination";
import Image from "next/image";
import Link from "next/link";
import baseUrl from "@/utils/baseUrl";

const getData = async ({ page, limit, category, editorsChoice, views, title }: SearchParams) => {
  const res = await fetch(
    `${baseUrl}/api/posts?page=${page}&limit=${limit}&category=${category}&editorsChoice=${editorsChoice}&views=${views}&title=${title}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const CardPost: React.FC<SearchParams> = async ({ page, category, editorsChoice, views, title }) => {
  const limit = 10;
  const { posts, count } = await getData({ page, limit, category, editorsChoice, views, title });
  const hasNext = limit * page < count;
  const hasPrev = page > 1;

  return (
    <div className="sm:flex-[5] mt-12">
      <h1 className="text-xl font-bold mb-6 w-full">Recent Posts </h1>
      <div className="grid grid-cols-1  lg:grid-cols-2 justify-items-stretch gap-4 mb-6">
        {posts.map((item: PostInterface) => (
          <div
            key={item.id}
            className="card sm:card-side bg-base-100 shadow-sm shadow-indigo-200 motion-preset-slide-right "
          >
            {item.img && (
              <figure className="min-h-40 relative flex-[1]">
                <Image
                  src={item.img}
                  alt="Movie"
                  fill
                  className="object-cover"
                />
              </figure>
            )}
            <div className="card-body flex-[1.5] lg:p-4">
              <div className="flex items-center gap-2">
                <span className="text-xs">
                  {item.createdAt.substring(0, 10)}
                </span>
                <div 
                style={{ backgroundColor: item.cat.color }}
                className="px-2 py-[3px] rounded-full text-xs text-slate-700 capitalize">{item.cat.title}</div>
                {item.isEditorsChoice && <Check/>}
              </div>
              <Link
                href={`/posts/${item.slug}`}
                className="card-title line-clamp-2"
              >
                {item.title}
              </Link>
              <p className="line-clamp-2">{item.desc}</p>
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

export default CardPost;

const Check = () => {
  return (
    <svg
      className="w-5 h-5 text-yellow-500 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
