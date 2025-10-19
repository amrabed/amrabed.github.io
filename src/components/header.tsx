"use client";

import Link from "next/link";

import { ReactNode, useState } from "react";

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
} from "@heroui/react";

import { Searchbar, SearchIcon } from "./search";

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

export const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="pt-10"
    >
      <NavbarBrand>
        <Title />
      </NavbarBrand>

      <NavbarContent className="sm:hidden" justify="end">
        <NavbarItem key="toggle">
          <NavbarMenuToggle />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        {sections.map((section) => (
          <NavbarItem key={section.name}>
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
        <NavbarItem key="separator">
          <Divider orientation="vertical" className="h-10 my-4" />
        </NavbarItem>
        {pages.map((page) => (
          <NavbarItem key={page.name}>
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

      <NavbarMenu className="pt-10 dark:bg-background backdrop-blur-500 transition-all duration-1000">
        {sections.map((section) => (
          <NavbarMenuItem key={section.name}>
            <Link
              className="hover:text-primary hover:dark:text-primary-dark"
              href={section.link}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="text-lg p-1 hover:text-primary hover:dark:text-primary-dark">
                {section.name}
              </div>
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarItem key="separator">
          <Divider />
        </NavbarItem>
        {pages.map((page) => (
          <NavbarMenuItem key={page.name}>
            <Link
              className={"hover:text-primary hover:dark:text-primary-dark"}
              href={page.link}
              onClick={() => setIsMenuOpen(false)}
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
};

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
        <h1 className="text-xl p-1">{title}</h1>
      </div>
      <div className="hidden sm:flex w-1/2 lg:w-1/3">
        <Searchbar
          placeholder={placeholder}
          query={query}
          setQuery={setQuery}
        />
      </div>
      <div className="flex flex-row">
        <div className="flex sm:hidden">
          <SearchIcon
            placeholder={placeholder}
            query={query}
            setQuery={setQuery}
          />
        </div>
        {children}
      </div>
    </div>
  </div>
);
