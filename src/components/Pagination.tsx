"use client";

import { useRouter } from "next/navigation";

const Pagination = ({ page, hasPrev, hasNext }: { page: number, hasPrev: boolean, hasNext: boolean }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between">
      <div className="join grid grid-cols-2">
        <button
          className="join-item btn btn-outline"
          onClick={() => router.push(`?page=${page - 1}`)}
          disabled={!hasPrev}
        >
          Previous
        </button>
        <button
          className="join-item btn btn-outline"
          onClick={() => router.push(`?page=${page + 1}`)}
          disabled={!hasNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
