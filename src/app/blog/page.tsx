import CardList from "@/components/CardList";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

interface SearchParams {
  page?: string;
  cat: string;
}

interface HomeProps {
  searchParams: SearchParams;
}

const BlogPage : React.FC<HomeProps> = ({ searchParams }) => {
  const page = parseInt(searchParams.page || "1", 10);
  const cat = searchParams.cat || "";
  console.table({cat})
  return (
    <div>
      <Navbar />
      <div className="container mt-24">
        {/* <div className="shadow-lg bg-base-200 py-2"> */}
          <h1 className="font-bold uppercase text-center text-xl">
            {cat} Blog
          </h1>
        {/* </div> */}
        <div className="md:flex md:gap-8">
          <CardList page={page} category={cat} />
          <Menu />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
