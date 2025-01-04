"use client";
import { signOut, useSession } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
const Navbar = () => {
  const { status } = useSession();

  return (
    <div className="navbar bg-base-100 absolute left-0 top-0 sm:px-8 md:px-12 lg:px-16 xl:px-28 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-[9999]"
          >
            <li>
              <Link href={"/"}>Homepage</Link>
            </li>
            <li>
              <Link href={"/blog"}>Blog</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
            {/* <li>
              <Link href={"/corner"}>Corner</Link>
            </li> */}
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            {status === "authenticated" && (
              <>
                <li>
                  <Link href={"/write"}>Write</Link>
                </li>
                <li>
                  <Link href={"/myposts"}>My Posts</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl">MrMalo</a>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/"}>Homepage</Link>
          </li>
          <li>
            <Link href={"/blog"}>Blog</Link>
          </li>
          <li>
            <Link href={"/contact"}>Contact</Link>
          </li>
          {/* <li>
            <Link href={"/corner"}>Corner</Link>
          </li> */}
          <li>
            <Link href={"/about"}>About</Link>
          </li>
          {status === "authenticated" && (
            <>
              <li>
                <Link href={"/write"}>Write</Link>
              </li>
              <li>
                <Link href={"/myposts"}>My Posts</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <ThemeToggle />
        {status === "authenticated" ? (
          <button
            className="btn btn-sm btn-ghost "
            onClick={(e) => {
              e.preventDefault(); // Tambahkan ini jika ingin mencegah perilaku default
              signOut();
            }}
          >
            Logout
          </button>
        ) : (
          <Link href={"/login"} className="btn btn-sm btn-ghost ">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
