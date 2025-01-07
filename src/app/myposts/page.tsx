"use client";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import SmModal from "@/components/SmModal";
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

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch data");
  }

  return data;
};

const MyBlog: React.FC<HomeProps> = ({ searchParams }) => {
  const router = useRouter();
  const { data, status } = useSession();
  const userEmail = data?.user?.email;
  const page = parseInt(searchParams.page || "1", 10);

  const limit = 4;

  const {
    data: dataPosts,
    mutate,
    isLoading,
  } = useSWR(
    `/api/posts?page=${page}&limit=${limit}&userEmail=${userEmail}`,
    fetcher
  );

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [modalIsActive, setModalIsActive] = useState(false);
  const [idPost, setIdPost] = useState("");

  const hasNext = limit * page < dataPosts?.count;
  const hasPrev = page > 1;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loading/>
  }

  const deletePost = async (slug: string) => {
    try {
      setIsLoadingDelete(true);
      await fetch(`/api/posts/${slug}`, { method: "DELETE" });
      toast.success("Deleteing post was successfull");
      mutate();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete data!");
    } finally {
      setIsLoadingDelete(false);
    }
  };
  return (
    <Layout>
      <div className="overflow-x-auto">
        <table className="table table-pin-rows table-pin-cols">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Category</th>
              <th>Title</th>
              <th>Created at</th>
              <th>action</th>
            </tr>
          </thead>
          {isLoading && (
            <tbody>
              <tr>
                <td colSpan={6} className="text-center">
                  <span className="loading loading-dots loading-lg"></span>
                </td>
              </tr>
            </tbody>
          ) || dataPosts.count === 0 && (
            <tbody>
              <tr>
                <td colSpan={6} className="text-center ">
                  <div role="alert" className="alert">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-info h-6 w-6 shrink-0">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Data is emphty.</span>
                  </div>
                </td>
              </tr>
            </tbody>
          ) || (
            <tbody>
              {dataPosts?.posts.map((item: PostInterface, index: number) => (
                <tr key={item.id}>
                  <th>{(page - 1) * limit + (index + 1)}</th>
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
                    <Link href={`/myposts/update/${item.slug}`} className="">
                      <EditSvg />
                    </Link>
                    <button
                      onClick={() => {
                        setIdPost(item.slug);
                        setModalIsActive(true);
                      }}
                    >
                      <TrashSvg />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {!isLoading && (
          <div className="mt-4">
            <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} />
          </div>
        )}
      </div>

      {/* Modal */}
      <SmModal isAcctive={modalIsActive}>
        <div className="max-w-xs w-full p-6 bg-base-100 dark:bg-smdark rounded-3xl flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-7xl text-red-500">
              <Warning />
            </h1>
            <h1 className="text-xl font-semibold">Are You Sure ?</h1>
            <p className="text-base">You are going to delete the project</p>
          </div>
          <div className="flex gap-4 mx-auto">
            <button
              className="btn"
              onClick={() => setModalIsActive(!modalIsActive)}
            >
              Cencel
            </button>
            <button
              className={`btn btn-error ${
                isLoadingDelete ? "cursor-wait" : ""
              }`}
              onClick={async () => {
                await deletePost(idPost);
                setModalIsActive(!modalIsActive);
              }}
              disabled={isLoadingDelete}
            >
              {isLoadingDelete ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </SmModal>
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

const Warning = () => {
  return (
    <svg
      className="w-20 h-20 text-error dark:text-white"
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
        d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

export default MyBlog;
