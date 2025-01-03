import CardPost from "@/components/CardPost";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchFilter from "@/components/SearchFilter";

interface SearchParams {
  page?: string;
  cat?: string;
  editorsChoice?: string;
  views?: string;
  title?: string;
}

interface HomeProps {
  searchParams: SearchParams;
}

const BlogPage: React.FC<HomeProps> = ({ searchParams }) => {
  const page = parseInt(searchParams.page || "1", 10);
  const cat = searchParams.cat || "";
  const editorsChoice = searchParams.editorsChoice === "true";
  const views = searchParams.views === "true";
  const title = searchParams.title || "";

  return (

    <div>
      <Navbar />
      <div className="container mt-24">
        <div className="">
            <SearchFilter cat={cat} choice={editorsChoice} view={views} title={title}  />
        </div>
        <div className="md:flex md:gap-8">
          <CardPost page={page} category={cat} editorsChoice={editorsChoice} views={views} title={title}/>
        </div>
      </div>


      <Footer />
    </div>
  );
};

export default BlogPage;
