import Avatar from "@/components/Avatar";
import Comments from "@/components/Comments";
import Layout from "@/components/Layout";
import Menu from "@/components/Menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SinglePage = () => {
  return (
    <Layout>
      <div className="card sm:card-side bg-base-100 gap-6 rounded-none">
        <div className="card-body flex-[1] p-0 justify-between gap-4">
          <h1 className="card-title text-2xl sm:text-3xl md:text-3xl lg:text-4xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
            magnam?
          </h1>
          <Link href={"/"} className="flex gap-6 items-center">
            <Avatar src="/coding.png" alt="coding" />
            <div className="flex flex-col">
              <span className="text-sm font-bold">Joe Doe Jhonson</span>
              <span className="text-xs">01 Maret 2024</span>
            </div>
          </Link>
        </div>
        <figure className="min-h-60 lg:h-72 relative flex-[1] ">
          <Image
            src="/food.png"
            alt="Movie"
            fill
            className="object-cover  rounded-lg"
          />
        </figure>
      </div>
      <div className="md:flex md:gap-8">
        <div className="sm:flex-[5] mt-12">
          <div className="mb-12 text-justify">
            <p className="mb-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque
              vero inventore delectus facilis incidunt officiis fuga voluptatum
              nostrum accusantium dolore impedit, vitae alias deleniti eius.
              Deleniti unde ipsam quis vero!
            </p>
            <p className="mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              deserunt quas perferendis, temporibus animi facere accusamus
              doloribus dolor consectetur molestiae. Qui expedita laboriosam
              voluptates ipsam voluptatum incidunt nemo necessitatibus
              distinctio hic quam quos omnis aliquid amet illum, quas sint. Ab
              illum explicabo laudantium provident, sed, quis perferendis earum
              deleniti molestias nam exercitationem quasi iste obcaecati unde
              dolorum. Soluta delectus ipsum perspiciatis temporibus laboriosam
              quis quisquam perferendis enim. Non dolorem ipsum enim animi?
              Dolor quos eveniet ut obcaecati. Sunt facere repellendus fugit
              modi, nobis cumque eum error aliquam voluptatem, delectus nisi
              ducimus voluptate doloribus soluta necessitatibus laboriosam harum
              aliquid rem cupiditate.
            </p>
            <p className="mb-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
              maxime iste reprehenderit recusandae corporis nulla non nisi
              dolore. Quo temporibus deleniti delectus fugiat ut rem a explicabo
              molestiae fugit eos.
            </p>
          </div>
          <div>
            <Comments />
          </div>
        </div>
        <Menu />
      </div>
    </Layout>
  );
};

export default SinglePage;
