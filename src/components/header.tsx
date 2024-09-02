import Link from "next/link";

import { ReactNode } from "react";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import {
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import Search from "./search";

export const sections = [
  {
    name: "skills",
    link: "#skills",
  },
  {
    name: "certifications",
    link: "#certifications",
  },
  {
    name: "degrees",
    link: "#degrees",
  },
];

export const pages = [
  {
    name: "projects",
    link: "./projects",
  },
  {
    name: "positions",
    link: "./positions",
  },
];

const Title = () => (
  <Link href="#" className="text-lg font-sembold">
    Amr Abed
  </Link>
);

export const MainHeader = () => (
  <Navbar>
    <NavbarBrand>
      <Title />
    </NavbarBrand>

    <NavbarContent className="sm:hidden" justify="end">
      <NavbarMenuToggle />
    </NavbarContent>

    <NavbarContent className="hidden sm:flex gap-4" justify="start">
      {sections.map((section, index) => (
        <NavbarItem key={index}>
          <Link
            className={"hover:text-primary hover:dark:text-primary-dark"}
            href={section.link}
          >
            <div className="h-full pb-1 hover:pb-0 flex items-center border-primary dark:border-primary-dark transition-all">
              {section.name}
            </div>
          </Link>
        </NavbarItem>
      ))}
      <Divider orientation="vertical" className="h-10 my-4" />
      {pages.map((page, index) => (
        <NavbarItem key={index}>
          <Link
            className={"hover:text-primary hover:dark:text-primary-dark"}
            href={page.link}
          >
            <div className="h-full pb-1 hover:pb-0 flex items-center border-primary dark:border-primary-dark transition-all">
              {page.name}
            </div>
          </Link>
        </NavbarItem>
      ))}{" "}
    </NavbarContent>

    <NavbarMenu className="w-[70%] h-screen bg-white dark:bg-slate-800 transition-all duration-1000">
      {sections.map((section, index) => (
        <NavbarMenuItem key={index}>
          <Link
            className="hover:text-primary hover:dark:text-primary-dark"
            href={section.link}
          >
            <div className="text-lg p-1 hover:text-primary hover:dark:text-primary-dark">
              {section.name}
            </div>
          </Link>
        </NavbarMenuItem>
      ))}
      <Divider />
      {pages.map((page, index) => (
        <NavbarMenuItem key={index}>
          <Link
            className={"hover:text-primary hover:dark:text-primary-dark"}
            href={page.link}
          >
            <div className="text-lg p-1 hover:text-primary hover:dark:text-primary-dark">
              {page.name}
            </div>
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  </Navbar>
);

export const PageHeader = ({
  title,
  query,
  setQuery,
  placeholder,
  children,
}: {
  title: string;
  query: string;
  setQuery: (query: string) => void;
  placeholder: string;
  children: ReactNode;
}) => (
  <div className="w-full p-5 backdrop-filter backdrop-blur-lg md:flex justify-between items-center gap-4 shadow-sm shadow-gray-300 dark:shadow-gray-800 fixed z-10 transition-all duration-500">
    <div className="flex flex-row justify-between w-full">
      <div className="flex flex-row gap-1 p-1">
        <Link href="/">
          <ChevronLeftIcon className="size-8 text-xl" color="primary" />
        </Link>
        <h1 className="text-xl p-1 hidden md:flex">{title}</h1>
      </div>
      <Search placeholder={placeholder} query={query} setQuery={setQuery} />
      {children}
    </div>
  </div>
);
