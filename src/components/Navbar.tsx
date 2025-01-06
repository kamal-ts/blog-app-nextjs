"use client";
import { signOut, useSession } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const { status, data } = useSession();
  const pathname = usePathname();
  return (
    <div className="navbar bg-base-100 left-0 top-0 sm:px-8 md:px-12 lg:px-16 xl:px-28 shadow-lg fixed z-[9998]">
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
              <Link href={"/"} className={pathname === "/" ? "active" : ""}>
                Homepage
              </Link>
            </li>
            <li>
              <Link
                href={"/blog"}
                className={pathname === "/blog" ? "active" : ""}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href={"/contact"}
                className={pathname === "/contact" ? "active" : ""}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href={"/about"}
                className={pathname === "/about" ? "active" : ""}
              >
                About
              </Link>
            </li>
            {status === "authenticated" && (
              <>
                <li>
                  <Link
                    href={"/write"}
                    className={pathname === "/write" ? "active" : ""}
                  >
                    Write
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/myposts"}
                    className={pathname.startsWith("/myposts") ? "active" : ""}
                  >
                    My Posts
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl">Imblog</a>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/"} className={pathname === "/" ? "active" : ""}>
              Homepage
            </Link>
          </li>
          <li>
            <Link
              href={"/blog"}
              className={pathname === "/blog" ? "active" : ""}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href={"/contact"}
              className={pathname === "/contact" ? "active" : ""}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href={"/about"}
              className={pathname === "/about" ? "active" : ""}
            >
              About
            </Link>
          </li>
          {status === "authenticated" && (
            <>
              <li>
                <Link
                  href={"/write"}
                  className={pathname === "/write" ? "active" : ""}
                >
                  Write
                </Link>
              </li>
              <li>
                <Link
                  href={"/myposts"}
                  className={pathname.startsWith("/myposts") ? "active" : ""}
                >
                  My Posts
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <ThemeToggle />
        {status === "authenticated" ? (
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Image
                    alt="Tailwind CSS Navbar component"
                    height={100}
                    width={100}
                    src={data.user?.image || "/avatar.png"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 min-w-60 max-w-6xl p-2 shadow overflow-hidden"
              >
                <div className="px-3 mb-2 flex items-center gap-2 w-full">
                  <div className="w-10">
                    <Image
                      className="rounded-full"
                      alt={data.user?.name || "avatar image"}
                      height={100}
                      width={100}
                      src={data.user?.image || "/avatar.png"}
                    />
                  </div>
                  <h6 className="text-lg line-clamp-1">
                    {data.user?.name}
                  </h6>
                  <hr />
                </div>
                <li>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); //Tambahkan ini jika ingin mencegah perilaku default
                      signOut();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
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
