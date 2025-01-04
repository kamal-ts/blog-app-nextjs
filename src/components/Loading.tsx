import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-full font-bold flex flex-col justify-center items-center gap-4">
      <span className="loading loading-spinner loading-lg "></span>
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
