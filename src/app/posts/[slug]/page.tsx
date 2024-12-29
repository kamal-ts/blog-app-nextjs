import Avatar from "@/components/Avatar";
import Comments from "@/components/Comments";
import Layout from "@/components/Layout";
import Menu from "@/components/Menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Params {
  slug: string;
}

interface HomeProps {
  params: Params;
}

const getData = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {cache: "no-store"});
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
}

const SinglePage: React.FC<HomeProps> = async ({params}) => {
  const {slug} = params 
  const post = await getData(slug);
  console.log('post', post)
  return (
    <Layout>
      <div className="card sm:card-side bg-base-100 gap-6 rounded-none">
        <div className="card-body flex-[1] p-0  gap-4">
          <h1 className="card-title text-2xl sm:text-3xl md:text-3xl lg:text-4xl">
            {post.title}
          </h1>
          <Link href={"/"} className="flex gap-6 items-center">
            <Avatar src={post.user.image ? post.user.image : "/avatar.png"} alt="coding" />
            <div className="flex flex-col">
              <span className="text-sm font-bold">Joe Doe Jhonson</span>
              <span className="text-xs">{post.createdAt.substring(0,10)}</span>
            </div>
          </Link>
        </div>
        {post.img && (

          <figure className="min-h-60 lg:h-72 relative flex-[1] ">
          <Image
            src={post.img}
            alt="Movie"
            fill
            className="object-cover  rounded-lg"
            />
        </figure>
          )}
      </div>
      <div className="md:flex md:gap-8">
        <div className="sm:flex-[5] mt-12">
          <div className="mb-12 text-justify" dangerouslySetInnerHTML={{ __html: post.desc }} />
          <div>
            <Comments postSlug={slug}/>
          </div>
        </div>
        <Menu />
      </div>
    </Layout>
  );
};

export default SinglePage;
