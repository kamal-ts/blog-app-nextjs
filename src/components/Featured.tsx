import Image from "next/image";
import Link from "next/link";

const fetchData = async () => {
  const res = await fetch("http://localhost:3000/api/posts?limit=1&views=true&isEditorsChoice", {cache: "no-store"});
  if (!res.ok) {
    throw new Error("Failed");
  }
  const {posts} = await res.json();
  return posts[0];
}

const Featured = async () => {

  const post = await fetchData();

  return (
    <div>
      <h1 className="text-5xl lg:text-7xl "><span className="font-bold">Your Destination </span>For Creativity, Knowledge, and Growth.</h1>
      <h2 className="mt-4 mb-10 text-slate-500">Discover insights, tips, and trends to fuel your creativity and success.</h2>
      <div className="md:flex items-center gap-10 hidden">
        <div className="flex-1 h-80 relative ">
          <Image src={post.img} fill alt={post.title} className="object-cover rounded-xl" />
        </div>
        <div className="flex-1 h-80 flex items-center">
          <div>
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p className="py-6">
              {post.desc}
            </p>
            <Link href={`/posts/${post.slug}`} className="btn btn-outline">Read More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
