import Image from "next/image";
import Link from "next/link";

const CategoryList = () => {
  return (
    <div className="mt-12">
      <h1 className="text-xl font-bold mb-6">Popular Categories </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <ListCategory
          href={"/blog"}
          color={"bg-sky-100"}
          image={"/style.png"}
          title={"style"}
        />
        <ListCategory
          href={"/blog"}
          color={"bg-red-100"}
          image={"/fashion.png"}
          title={"fashion"}
        />
        <ListCategory
          href={"/blog"}
          color={"bg-yellow-100"}
          image={"/food.png"}
          title={"food"}
        />
        <ListCategory
          href={"/blog"}
          color={"bg-green-100"}
          image={"/travel.png"}
          title={"travel"}
        />
        <ListCategory
          href={"/blog"}
          color={"bg-purple-100"}
          image={"/culture.png"}
          title={"culture"}
        />
        <ListCategory
          href={"/blog"}
          color={"bg-pink-100"}
          image={"/coding.png"}
          title={"coding"}
        />
      </div>
    </div>
  );
};

export default CategoryList;

const ListCategory: React.FC<{
  href: string;
  color?: string;
  title: string;
  image: string;
}> = ({ href, title, image }) => {
  return (
    <Link
      href={href}
      className={` btn`}
    >
      <div className="w-8 h-8 relative">
        <Image
          fill
          src={image}
          alt={title}
          className="rounded-full object-cover border-2 border-white"
        />
      </div>
      {title}
    </Link>
  );
};
