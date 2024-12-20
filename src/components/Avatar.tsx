import Image from "next/image";

const Avatar: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return (
    <div className="w-10 h-10 relative">
      <Image
        fill
        src={src}
        alt={alt}
        className="rounded-full object-cover outline outline-1 outline-offset-1 outline-slate-200"
      />
    </div>
  );
};

export default Avatar;
