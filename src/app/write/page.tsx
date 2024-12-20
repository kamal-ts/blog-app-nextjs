"use client";
import Layout from "@/components/Layout";
import React, { useState } from "react";
import dynamic from "next/dynamic";

// Import ReactQuill secara dinamis tanpa SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Write = () => {

  const {status} = useSession();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  
  
  if (status==="loading") {
    return (
      <div>Loading...</div>
    )
  }

  if (status === "unauthenticated") {
    router.push("/");
  }



  return (
    <Layout>
      <div>
        <input
          type="text"
          className="text-xl md:text-4xl font-semibold outline-none border-b mb-6 w-full bg-transparent"
          placeholder="Title"
        />
        <div className="relative">
          <button
            onClick={() => {
              setOpen(!open);
            }}
          >
            <svg
              className="w-[30px] h-[30px] text-base-content"
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
                strokeWidth="1"
                d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          {open && (
            <div className="absolute top-0 left-11 flex gap-2">
              <button>
                <svg
                  className="w-[30px] h-[30px] text-green-500"
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
                    strokeWidth="1"
                    d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                  />
                </svg>
              </button>
              <button>
                <svg
                  className="w-[30px] h-[30px] text-green-500"
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
                    strokeWidth="1"
                    d="M14 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm7 11-6-2V9l6-2v10Z"
                  />
                </svg>
              </button>
            </div>
          )}
          <ReactQuill
            className="border rounded-lg min-h-60 lg:min-h-20 mb-6"
            value={value}
            onChange={setValue}
            theme="bubble"
            placeholder="Tell your story..."
          />
          <button className="btn btn-accent">Publich</button>
        </div>
      </div>
    </Layout>
  );
};

export default Write;
