"use client"
import Image from "next/image";
import { useState } from "react";

const Avatar: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [image, setImage] = useState(src)
  return (
    <div className="w-11 h-11 relative">
      <Image
        fill
        src={image}
        alt={alt}
        onError={() => setImage('/avatar.png')} 
        className="rounded-full object-cover"
      />
    </div>
  );
};

export default Avatar;
