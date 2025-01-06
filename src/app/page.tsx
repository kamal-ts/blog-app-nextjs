import CardList from "@/components/CardList";
import CategoryList from "@/components/CategoryList";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

interface SearchParams {
  page?: string;
}

interface HomeProps {
  searchParams: SearchParams;
}

const Home: React.FC<HomeProps> = ({ searchParams }) => {
  const page = parseInt(searchParams.page || "1", 10);

  return (
    <div>
      <Navbar/>
      <div className="container mt-28">
        <Featured/>
        <CategoryList/>
        <div className="md:flex md:gap-8">
          <CardList page={page} category=""/>
          <Menu/>
        </div>
      </div>
      <Footer/>
      
    </div>
  );
}

export default Home;
