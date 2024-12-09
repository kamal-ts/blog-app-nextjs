import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container mt-28">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
