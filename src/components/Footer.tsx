import { Github, Linkedin, TikTok, Xtwiter } from "@/utils/icon";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-base-content mt-12 py-10 flex flex-col items-center ">
      <div className="footer justify-between">
        <aside>
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14">
              <Image
                src="/logo.png"
                alt="Movie"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-xl font-bold">MrMalo</h1>
          </div>
            <p>Share your idea & Write your story</p>          
        </aside>
        <nav>
          <h6 className="footer-title">Links</h6>
          <Link href={"/"} className="link link-hover">
            Homepage
          </Link>
          <Link href={"/blog"} className="link link-hover">
            Blog
          </Link>
          <Link href={"/contact"} className="link link-hover">
            Contact
          </Link>
          <Link href={"/about"} className="link link-hover">
            About
          </Link>
          {/* {status === "authenticated" && (
            <>
                <Link href={"/write"} >Write</Link>
                <Link href={"/myposts"} >My Posts</Link>
            </>
          )} */}
        </nav>
        <nav>
          <h6 className="footer-title">BUILD WITH:</h6>
          <Link href="https://nextjs.org" target="_blank">
            Next.js
          </Link>
          <Link href="https://daisyui.com" target="_blank">
            DaisyUI
          </Link>
          <Link href="https://prisma.io" target="_blank">
            Prisma
          </Link>
          <Link href="https://vercel.com" target="_blank">
            Vercel
          </Link>
          <Link href="https://cloudinary.com" target="_blank">
            Cloudinary
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="flex gap-2">
            <Link href="https://github.com/kamal-ts" target="_blank">
              <Github />
            </Link>
            <Link
              href="https://www.linkedin.com/in/la-ode-kamaluddin-00747b2bb/?trk=opento_sprofile_details"
              target="_blank"
            >
              <Linkedin />
            </Link>
            <Link href={"https://x.com/Kamal03964428"} target="_blank">
              <Xtwiter />
            </Link>
            <Link href={"https://www.tiktok.com/@mp951901"} target="_blank">
              <TikTok />
            </Link>
          </div>
        </nav>
      </div>
      <p className="mt-10">© 2024 Imblog. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
