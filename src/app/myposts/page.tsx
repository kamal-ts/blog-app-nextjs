"use client";
import Layout from "@/components/Layout";
import { PostInterface } from "@/utils/interface";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

interface SearchParams {
  page?: string;
  cat: string;
}

interface HomeProps {
  searchParams: SearchParams;
}

interface SearchParamsWithEmail {
  page?: number;
  userEmail?: string | null;
}

const fetcher = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch data");
    }
  
    return data.posts;
  };

const MyBlog: React.FC<HomeProps> = ({ searchParams }) => {
  const router = useRouter();
  const { data, status } = useSession();
  const userEmail = data?.user?.email;
  const page = parseInt(searchParams.page || "1", 10);
//   const [posts, setPosts] = useState<PostInterface[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
const { data : posts, mutate, isLoading, error } = useSWR(
    `http://localhost:3000/api/posts?page=${page}&limit=4&userEmail=${userEmail}`,
    fetcher
  );
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

//   useEffect(() => {
//     const fetchPost = async ({ page, userEmail }: SearchParamsWithEmail) => {
//       try {
//         setIsLoading(true);
//         const res = await fetch(
//           `http://localhost:3000/api/posts?page=${page}&limit=4&userEmail=${userEmail}`,
//           { cache: "no-store" }
//         );
//         if (!res.ok) {
//           throw new Error("Failed");
//         }
//         const { posts } = await res.json();
//         setPosts(posts);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to fetch Posts!");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (status === "authenticated") {
//       fetchPost({ page, userEmail });
//     }
//   }, [page, status, userEmail]);

  const deletePost = async (slug: string) => {
    try {
        await fetch(`/api/posts/${slug}`, {method: "DELETE"});
        toast.success("Deleteing post was successfull");
        mutate();
    } catch (error) {
        console.error(error);
        toast.error("Failed to delete data!");
    }
  }

  return (
    <Layout>
      <div className="overflow-x-auto">
        <table className="table table-pin-rows table-pin-cols">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Created at</th>
              <th>action</th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={6} className="text-center">
                  <span className="loading loading-dots loading-lg"></span>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {posts.map((item: PostInterface, index: number) => (
                <tr key={item.id}>
                  <th>{index + 1}</th>
                  <th className="text-center">
                    {item.img ? (
                      <figure className="min-h-10 relative flex-[1]">
                        <Image
                          src={item.img}
                          alt="Movie"
                          fill
                          className="object-cover"
                        />
                      </figure>
                    ) : (
                      "-"
                    )}
                  </th>
                  <td>
                    <div
                      style={{ backgroundColor: item.cat.color }}
                      className="inline-block px-2 py-[3px] rounded-full text-[10px] font-bold text-slate-700 capitalize mb-1"
                    >
                      {item.cat.title}
                    </div>
                  </td>
                  <td>{item.title}</td>
                  <td>{item.createdAt.substring(0, 10)}</td>
                  <td className="flex flex-col md:flex-row gap-2">
                    <Link href={`/posts/${item.slug}`} className="">
                      <EyeSvg />
                    </Link>
                    <Link href={`/myposts/${item.slug}`} className="" >
                      <EditSvg />
                    </Link>
                    <button className="" onClick={() => deletePost(item.slug)}>
                      <TrashSvg />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </Layout>
  );
};

const EyeSvg = () => {
  return (
    <svg
      className="w-6 h-6 text-primary dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
};

const EditSvg = () => {
  return (
    <svg
      className="w-6 h-6 text-accent dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
      />
    </svg>
  );
};

const TrashSvg = () => {
  return (
    <svg
      className="w-6 h-6 text-error dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
      />
    </svg>
  );
};

export default MyBlog;
