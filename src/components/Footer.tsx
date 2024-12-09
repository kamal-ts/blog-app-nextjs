import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer text-base-content mt-12 py-10 justify-between">
      <aside>
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14">
            <Image src="/logo.png" alt="Movie" fill className="object-cover" />
          </div>
          <h1 className="text-xl font-bold">MrMalo</h1>
        </div>
        <p>
          ACME Industries Ltd.
          <br />
          Providing reliable tech since 1992
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Links</h6>
        <Link href={"/"} className="link link-hover">Branding</Link>
        <Link href={"/"} className="link link-hover">Design</Link>
        <Link href={"/"} className="link link-hover">Marketing</Link>
        <Link href={"/"} className="link link-hover">Advertisement</Link>
      </nav>
      <nav>
        <h6 className="footer-title">Tags</h6>
        <Link href={"/"} className="link link-hover">About us</Link>
        <Link href={"/"} className="link link-hover">Contact</Link>
        <Link href={"/"} className="link link-hover">Jobs</Link>
        <Link href={"/"} className="link link-hover">Press kit</Link>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <Link href={"/"} className="link link-hover">Terms of use</Link>
        <Link href={"/"} className="link link-hover">Privacy policy</Link>
        <Link href={"/"} className="link link-hover">Cookie policy</Link>
      </nav>
    </footer>
  );
};

export default Footer;
