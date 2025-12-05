"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import useUserStore from "@/utils/zustand/store";
import { ZUSTAND_USER } from "@/types/zustand_types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, Menu } from "lucide-react";
import { link_data } from "./links";

const HeaderComponent = () => {
  const [loggedUser, setLoggedUser] = useState<ZUSTAND_USER | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { getUser } = useUserStore();

  useEffect(() => {
    setIsMounted(true);
    setLoggedUser(getUser());
  }, [isMounted]);

  return (
    <div className="w-full h-15 absolute flex bg-white">
      <div className="w-full max-w-[1300px] flex justify-between items-center mx-auto">
        {/* the logo holder */}
        <div className="w-[200px] h-full flex justify-center items-center pt-1.5">
          <Image
            src="/buglite.png"
            width={150}
            height={20}
            alt="blog-lite-logo"
          />
        </div>
        {/* the links holder */}
        <div className="w-full h-full justify-between items-center hidden md:flex md:max-w-[300px]">
          <span className="text-md font-semibold cursor-pointer">Home</span>
          <span className="text-md font-semibold cursor-pointer">About Us</span>
          <span className="text-md font-semibold cursor-pointer">
            Contact Us
          </span>
        </div>

        {!isMounted ? (
          <div className="flex justify-center items-center mr-2.5">
            <Link href="/signin">
              <Button className="text-md ml-2.5" size="lg">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="text-md ml-2.5" size="lg" variant="outline">
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="w-[300px] flex justify-center items-center">
                <Avatar className="size-10 rounded-lg">
                  <AvatarImage src={loggedUser?.image || "sample_query"} />
                  <AvatarFallback className="size-10 rounded-lg">
                    {loggedUser?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center items-start ml-3">
                  <span className="text-lg font-semibold">
                    {loggedUser?.username}
                  </span>
                  <span className="text-muted-foreground ">
                    {loggedUser?.email}
                  </span>
                </div>
                {/* collapse btn */}
                <Button variant="ghost" size="icon-sm" className="ml-5">
                  <Menu />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[250px]">
              <DropdownMenuLabel>Welcome Back!</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {link_data.map((link) => {
                  return (
                    <Link key={link.name} href={link.link}>
                      <DropdownMenuItem>
                        {link.icon && <link.icon />}
                        <span className="ml-2 capitalize">{link.name}</span>
                      </DropdownMenuItem>
                    </Link>
                  );
                })}
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem>
                  <LogOut />
                  <span className="ml-2 capitalize">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
