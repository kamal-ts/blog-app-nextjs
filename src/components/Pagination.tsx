"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ page, hasPrev, hasNext }: { page: number, hasPrev: boolean, hasNext: boolean }) => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Untuk membaca query parameters yang ada

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString()); // Salin query yang ada
    params.set("page", newPage.toString()); // Set parameter page baru

    router.push(`?${params.toString()}`); // Redirect dengan parameter baru
  };
  return (
    <div className="flex justify-between">
      <div className="join grid grid-cols-2">
        <button
          className="join-item btn btn-outline"
          onClick={() => handlePageChange(page - 1)}
          disabled={!hasPrev}
        >
          Previous
        </button>
        <button
          className="join-item btn btn-outline"
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
