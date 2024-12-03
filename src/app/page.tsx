import CardList from "@/components/CardList";
import CategoryList from "@/components/CategoryList";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="container mt-28">
        <Featured/>
        <CategoryList/>
        <div className="md:flex md:gap-8">
          <CardList/>
          <Menu/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
