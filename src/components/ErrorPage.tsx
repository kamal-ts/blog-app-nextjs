import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-screen text-center">
      <div>
        <h1 className="text-3xl font-bold">Error</h1>
        <p>Failed to load the post. Please try again later.</p>
        <Link href="/" className="mt-4 text-blue-500 underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
