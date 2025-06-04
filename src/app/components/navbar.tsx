"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { dataNav } from "@/hooks/dataNavbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaAmazon,
  FaApple,
  FaAws,
  FaBarsStaggered,
  FaBrain,
  FaHospital,
  FaUser,
} from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { FaClinicMedical } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginAction, logoutAction } from "@/lib/features/userSlice";
import { baseUrl } from "../utils/databases";
import axios from "axios";

const Navbarsection = () => {
  const [open, setOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [isTheme, setIsTheme] = useState(false);
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);
  console.log("data navbar", users);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutAction());
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // console.log(token);

    const keepLogin = async () => {
      try {
        const { data } = await axios.get(baseUrl + `/user/keep`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(loginAction(data.data.dataValues));
        console.log("dispatch action", data.data.dataValues);
      } catch (error) {
        console.log("error global state", error);
      }
    };
    keepLogin();
  }, []);

  const [scrollPosisition, setScorllPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScorllPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarStyle = {
    transition: "background-color 0.9s ease",
    backgroundColor: scrollPosisition > 0 ? "#08080D" : "#08080D",
    backdropFilter: "blur(4px)",
  };

  const textStyle = {
    color: scrollPosisition > 0 ? "##075fb8" : "#FFFFFF",
    // textShadow: scrollPosisition > 0 ? "1px 1px 2px #ffffff" : "1px 1px 2px #000000",
  };

  const logoStyle = {
    src:
      scrollPosisition > 0 ? "/image/logoSNB1putih.png" : "/image/logoSNB1putih.png",
  };

  useEffect(() => {
    setOpen(navbar);
    setIsTheme(isTheme);
  }, [navbar]);

  return (
    //navbar
    <header className="fixed  top-0 w-full" style={navbarStyle}>
      <nav className="mx-0 items-center justify-between rounded-xl p-3  px-10 md:mx-10 md:rounded-none">
        <div className="grid-flow-col justify-between md:grid md:w-full">
          {/* NAVBAR MOBILE */}
          <div className="flex justify-between  gap-5 sm:w-full md:w-full">
            <div className="flex items-center sm:w-[200px] md:w-[200px]">
              <Link href="/">
                <Image
                  src={
                    scrollPosisition > 0
                      ? "/image/logoSNB1putih.png"
                      : "/image/logoSNB1putih.png"
                  }
                  height={50}
                  width={50}
                  alt="logo PT. SOLUSI NUSANTARA BERDIKARI"
                />
              </Link>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center justify-center gap-5 md:hidden">
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {/* <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTheme("dark")}
                      >
                        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                      </Button> */}
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                </div>
                <div>
                  {users.id ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-800"
                          size="icon"
                          variant="ghost"
                          style={textStyle}
                        >
                          <FaUser />
                          <span className="sr-only">Toggle user menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={"/dashboard"}>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        </Link>
                        <DropdownMenuSeparator />

                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-800"
                          size="icon"
                          variant="ghost"
                          style={textStyle}
                        >
                          <FaUser />
                          <span className="sr-only">Toggle user menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuSeparator />
                        {/* <Link href={"/register"}>
                          <DropdownMenuItem>Register</DropdownMenuItem>
                        </Link> */}
                        <Link href={"/login"}>
                          <DropdownMenuItem>Login</DropdownMenuItem>
                        </Link>{" "}
                        <DropdownMenuSeparator />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                <Button onClick={() => setNavbar(!navbar)}>
                  {!navbar ? <FaBarsStaggered /> : <IoMdClose />}
                </Button>
              </div>
            </div>
          </div>

          {/* NAVBAR DEKSTOP */}
          <div className="col-span-2 flex items-center gap-5" >
            <div
              className={`w-full gap-5 justify-self-center md:flex  md:bg-transparent  ${open ? "grid place-items-center p-3  md:p-0" : "hidden sm:hidden "}`} style={textStyle}
            >
              {dataNav.map((data) => {
                return (
                  <NavigationMenu className="border-b-2 md:border-b-0 ">
                    <NavigationMenuList>
                      <NavigationMenuItem
                        key={data.title}
                        className=" my-2 flex w-64 justify-center md:my-0 md:w-full dark:text-white"
                      >

                        <>
                          <NavigationMenuLink
                            asChild
                            className={`${navigationMenuTriggerStyle()} text-md rounded-md bg-transparent px-5 py-2 hover:bg-transparent hover:text-third dark:bg-transparent`}
                          >
                            <div>
                              <a href={data.link}>
                                <div>{data.title}</div>
                              </a>
                            </div>
                          </NavigationMenuLink>
                        </>

                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                );
              })}
            </div>

          </div >
        </div >
      </nav >
    </header >
  );
};

export default Navbarsection;
