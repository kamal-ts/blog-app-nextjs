import CardList from "@/components/CardList";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

const BlogPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-28">
        <div className="shadow-lg bg-base-200 py-2">
          <h1 className="font-bold uppercase text-center text-xl">
            Style Blog
          </h1>
        </div>
        <div className="md:flex md:gap-8">
          <CardList />
          <Menu />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
