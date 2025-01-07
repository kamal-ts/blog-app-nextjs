import Avatar from "@/components/Avatar";
import Comments from "@/components/Comments";
import Layout from "@/components/Layout";
import Menu from "@/components/Menu";
import baseUrl from "@/utils/baseUrl";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";


interface Params {
  slug: string;
}


const getData = async (slug: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/posts/${slug}`, {cache: "no-store"});
    if (!res.ok) {
      return null
    }
    return res.json();
  } catch (error) {
    toast.error("Something went wrong!");
    console.log('error', error);
    return null;
  }
}

// Tambahkan fungsi generateMetadata
export async function generateMetadata({ params }: { params: Params }) {
  const post = await getData(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: `${post.title} | My Blog`,
    description: post.desc || "Read this amazing post on My Blog.",
  };
}

const SinglePage: React.FC<{params: Params}> = async ({params}) => {
  const {slug} = params 
  const post = await getData(slug);
  
  if (!post) {
    return notFound();
  }

  return (
    <Layout>
      <div className="card sm:card-side bg-base-100 gap-6 rounded-none">
        <div className="card-body flex-[1] flex justify-center p-0  gap-10">
          <h1 className="card-title text-3xl lg:text-4xl">
            {post.title}
          </h1>
          <Link href={"/"} className="flex gap-6 items-center">
            <Avatar src={post.user.image ? post.user.image : "/avatar.png"} alt="coding" />
            <div className="flex flex-col">
              <span className="text-sm font-bold">{post.user.name}</span>
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
          <article className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className="mt-10">
            <Comments postSlug={slug}/>
          </div>
        </div>
        <Menu />
      </div>
    </Layout>
  );
};

export default SinglePage;
