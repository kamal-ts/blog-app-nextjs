// import Image from "next/image";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
const Navbar = () => {
  const useAuth = true;

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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
            <li>
              <a>About</a>
            </li>
            {useAuth && (
            <li>
              <Link href={"/write"}>Write</Link>
            </li>
          )}
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl">MrMalo</a>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Homepage</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
          <li>
            <a>About</a>
          </li>
          {useAuth && (
            <li>
              <Link href={"/write"}>Write</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <ThemeToggle />
        {useAuth ? (
          <Link href={"/logout"} className="btn btn-sm btn-ghost ">
            Logout
          </Link>
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
