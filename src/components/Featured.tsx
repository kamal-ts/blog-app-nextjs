import Image from "next/image";
import React from "react";

const Featured = () => {
  return (
    <div>
      <h1 className="text-7xl "><span className="font-bold">Hey, Mr.Malo here!</span> Discover my stories and creative ideas.</h1>
      <div className="flex items-center gap-10 mt-12">
        <div className="flex-1 h-72 relative">
          <Image src={"/p1.jpeg"} fill alt="" className="object-cover rounded-xl" />
        </div>
        <div className="flex-1 h-72 flex items-center">
          <div>
            <h1 className="text-2xl font-bold">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, aspernatur?</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-outline">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
