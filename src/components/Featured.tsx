import Image from "next/image";
import Link from "next/link";
import WarningAlert from "./WarningAlert";

const fetchData = async () => {
  try {
    const res = await fetch(
      "http://localhost:3000/api/posts?limit=1&views=true&isEditorsChoice"
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    const data = await res.json();
    return data || { posts: [] };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { posts: [] };
  }
};
const Featured = async () => {
  const data = await fetchData();

  if (!data || !data.posts || data.posts.length === 0) {
    return (
      <div>
        <h1 className="text-5xl lg:text-7xl">
          <span className="font-bold">Your Destination </span>For Creativity,
          Knowledge, and Growth.
        </h1>
        <h2 className="mt-4 mb-10 text-slate-500">
          Discover insights, tips, and trends to fuel your creativity and
          success.
        </h2>
        <WarningAlert title="No featured posts available at the moment." />
      </div>
    );
  }

  const { posts } = data;
  return (
    <>
      <div>
        <h1 className="text-5xl lg:text-7xl">
          <span className="font-bold">Your Destination </span>For Creativity,
          Knowledge, and Growth.
        </h1>
        <h2 className="mt-4 mb-10 text-slate-500">
          Discover insights, tips, and trends to fuel your creativity and
          success.
        </h2>
        <div className="md:flex items-center gap-10 hidden">
          <div className="flex-1 h-80 relative">
            <Image
              src={posts[0].img || "/placeholder.png"}
              fill
              alt={posts[0].title}
              className="object-cover rounded-xl"
            />
          </div>
          <div className="flex-1 h-80 flex items-center">
            <div>
              <h1 className="text-2xl font-bold">{posts[0].title}</h1>
              <p className="py-6">{posts[0].desc}</p>
              <Link
                href={`/posts/${posts[0].slug}`}
                className="btn btn-outline"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
