import Layout from "@/components/Layout";
import React from "react";

const AboutPage = () => (
  <Layout>
    <div className="flex w-full flex-col lg:flex-row text-xl">
      <div className="flex-1 card rounded-box grid flex-grow h-auto p-4 gap-4 sm:p-10 bg-yellow-300 text-slate-800">
        <h1 className="card-title text-4xl">About Me</h1>
        <p>
          Hello, I’m Malo! I’m a web developer who loves sharing experiences and
          learning from the community. This blog is where I document my journey
          in programming—from project stories and technical solutions to the
          everyday challenges of being a developer.
        </p>
      </div>
      <div className="divider lg:divider-horizontal text-2xl">😎</div>
      <div className="flex-1 card rounded-box grid h-auto p-4 gap-4 sm:p-10 border-2 border-yellow-300">
        <h1 className="card-title text-4xl text-yellow-400">Not Just My Blog</h1>
        <p className="text-base-content">
          I believe the best ideas often come from conversations and
          collaboration. That’s why this blog is also open to you! If you have
          ideas, experiences, or insights to share, feel free to contribute
          here.
        </p>
        <p className="text-base-content ">
          Welcome to the blog, and let’s grow together!
        </p>
      </div>
    </div>
  </Layout>
);

export default AboutPage;
