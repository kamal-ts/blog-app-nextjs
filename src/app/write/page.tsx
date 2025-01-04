"use client";
import Layout from "@/components/Layout";
import React, { FormEvent, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import toast from "react-hot-toast";

// Import ReactQuill secara dinamis tanpa SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CategoryInterface } from "@/utils/interface";
import { ImageIcon, PlushRounded, VideoIcon } from "@/utils/icon";
import Image from "next/image";
import Loading from "@/components/Loading";

const Write = () => {
  const { status } = useSession();
  const [categories, setCategories] = useState<CategoryInterface[]>();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/categories", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch categories!");
      }
    };
    if (status === "authenticated") {
      fetchCategories();
    }
  }, [status]);

  // Handle loading
  if (status === "loading") {
    return <Loading />;
  }

  // Handle perubahan file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      // Validasi ukuran file (contoh: maksimum 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("catSlug", catSlug);
    formData.append("content", content);
    if (file) {
      formData.append("file", file); // Pastikan `image` sesuai dengan key di API
    }

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Post created successfully!");
        setFile(null);
        setTitle("");
        setDesc("");
        setContent("");
        setCatSlug("");
      } else {
        if (response.status === 400) {
          const errorData = await response.json();
          console.log("errorData", errorData);
          toast.error(errorData.error);
        } else {
          toast.error("Failed to create post!");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="text-xl md:text-4xl font-semibold outline-none border-b mb-6 w-full bg-transparent"
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <input
            type="text"
            required
            placeholder="Type Description Here"
            className="input input-bordered w-full max-w-full "
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <select
            className="select select-bordered w-full max-w-full sm:max-w-60"
            required
            value={catSlug}
            onChange={(e) => setCatSlug(e.target.value)}
          >
            <option disabled value={""}>
              Select category
            </option>
            {categories?.map((item) => (
              <option key={item.id} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <div
            className="cursor-pointer inline-block"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <PlushRounded />
          </div>
          {open && (
            <div className="absolute -top-3 left-11 bg-base-100 border rounded-lg shadow-lg h-auto w-40 z-[999] p-4">
              <input
                type="file"
                id="image"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex items-center gap-2">
                <div className="cursor-pointer">
                  <label htmlFor="image" className="cursor-pointer">
                    <ImageIcon />
                  </label>
                </div>
                <div className="cursor-pointer">
                  <VideoIcon />
                </div>
              </div>
              {file && (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Image Post"
                  height={150}
                  width={150}
                  className="mt-4"
                />
              )}
            </div>
          )}
          <ReactQuill
            className="border rounded-lg min-h-60 lg:min-h-20 mb-6"
            value={content}
            onChange={setContent}
            theme="bubble"
            placeholder="Tell your story..."
          />

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
          >
            {!isLoading ? "Publish" : "Publishing"}
            {isLoading && (
              <span className="loading loading-dots loading-xs"></span>
            )}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Write;
