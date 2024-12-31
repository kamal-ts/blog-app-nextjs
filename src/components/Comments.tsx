"use client";

import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import Link from "next/link";
import useSWR from "swr";
import React, { useState } from "react";
import { CommentInterface } from "@/utils/interface";

import toast from "react-hot-toast";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch data");
  }

  return data;
};


const Comments: React.FC<{
  postSlug: string;
}> = ({ postSlug }) => {
  const { status } = useSession();
  const { data, mutate, isLoading, error } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");

  if (error) {
    return (
      <p className="text-red-500">Failed to load comments: {error.message}</p>
    );
  }

  const handleSubmit = async () => {
    if (!desc.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }
    try {
      await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ desc, postSlug }),
      });
      toast.success("Comment submitted successfully!");
      mutate();
      setDesc("");
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to submit comment");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Comment</h1>
      {(status === "authenticated" && (
        <div className="flex items-center gap-2">
          <textarea
            value={desc}
            className="textarea textarea-xs text-sm textarea-bordered w-full flex-1"
            placeholder="Write a comment..."
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <button className="btn" onClick={handleSubmit}>
            Send
          </button>
        </div>
      )) || (
        <Link className="link" href={"/login"}>
          Login to write a comment
        </Link>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <div className={`flex flex-col max-h-96 overflow-y-auto border-[0.5px] border-base-300 rounded-lg p-4 mt-6 ${data.length < 1 && "hidden"}`}>
          {data?.map((item: CommentInterface) => (
              <ListCommets
              key={item.id}
                comment={item.desc}
                date={new Date(item.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                username={item.user.name}
                image={item.user.image}
                
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Comments;

const ListCommets: React.FC<{
  comment: string;
  username: string;
  date: string;
  image?: string;
}> = ({ comment, date, image = "/avatar.png", username }) => {
  return (
    <div>
      <Link href={"/"} className="flex gap-4 mb-6">
        <div>
          <Avatar src={image} alt="username" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-[12px] text-slate-500">
            <strong>{username}</strong>
            <span className=" "> {date}</span>
          </h1>
          <p className="text-sm">{comment}</p>
        </div>
      </Link>
    </div>
  );
};

const Loading = () => {
  return (
    <div>
      <div className="flex w-52 flex-col gap-4 mt-6">
        <div className="flex items-center gap-4">
          <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-3">
            <div className="skeleton h-2 w-28"></div>
            <div className="skeleton h-2 w-36"></div>
          </div>
        </div>
      </div>
      <div className="flex w-52 flex-col gap-4 mt-6">
        <div className="flex items-center gap-4">
          <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-3">
            <div className="skeleton h-2 w-28"></div>
            <div className="skeleton h-2 w-36"></div>
          </div>
        </div>
      </div>
      <div className="flex w-52 flex-col gap-4 mt-6">
        <div className="flex items-center gap-4">
          <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-3">
            <div className="skeleton h-2 w-28"></div>
            <div className="skeleton h-2 w-36"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
