import Layout from "@/components/Layout";
import React from "react";

const AboutPage = () => {
  return (
    <Layout>
      <div className="text-xl">
        <div className="card sm:card-side bg-base-100 gap-6 rounded-none ">
          <div className="card-body flex-[1] gap-4 bg-yellow-200 p-10 text-slate-800">
            <h1 className="card-title text-4xl">About Me</h1>
            <p>
              Hello, I’m Malo! I’m a web developer who loves sharing
              experiences and learning from the community. This blog is where I
              document my journey in programming—from project stories and
              technical solutions to the everyday challenges of being a
              developer.
            </p>
          </div>

          <div className="card-body flex-[1] gap-4 border-2 border-yellow-200 p-10 text-yellow-500">
            <h1 className="card-title text-4xl">Not Just My Blog</h1>
            <p className="text-base-content">
              I believe the best ideas often come from conversations and
              collaboration. That’s why this blog is also open to you! If you
              have ideas, experiences, or insights to share, feel free to
              contribute here.
            </p>
            <p className="text-base-content ">Welcome to the blog, and let’s grow together!</p>
          </div>
       
        </div>
       
      </div>
    </Layout>
  );
};

export default AboutPage;
