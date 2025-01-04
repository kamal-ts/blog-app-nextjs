"use client"
import Image from "next/image";
import { useState } from "react";

const Avatar: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [image, setImage] = useState(src)
  return (
    <div className="w-12 h-12 relative">
      <Image
        fill
        src={image}
        alt={alt}
        onError={() => setImage('/avatar.png')} 
        className="rounded-full object-cover outline outline-1 outline-offset-1 outline-slate-200"
      />
    </div>
  );
};

export default Avatar;
