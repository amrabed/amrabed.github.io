"use client";

import Link from "next/link";

import { ReactNode, useState } from "react";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Separator } from "@heroui/react";

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
  <Link href="#" className="text-lg font-semibold">
    Amr Abed
  </Link>
);

export const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-background/70 backdrop-blur-lg pt-10 px-6">
      <header className="max-w-7xl mx-auto flex h-16 items-center justify-between">
        <Title />

        <div className="sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="p-2"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <ul className="hidden sm:flex items-center gap-4">
          {sections.map((section) => (
            <li key={section.name}>
              <Link
                className="hover:text-primary transition-colors"
                href={section.link}
              >
                {section.name}
              </Link>
            </li>
          ))}
          <li key="separator">
            <Separator orientation="vertical" className="h-10 mx-2" />
          </li>
          {pages.map((page) => (
            <li key={page.name}>
              <Link
                className="hover:text-primary transition-colors"
                href={page.link}
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </header>

      {isMenuOpen && (
        <div className="sm:hidden pb-6 transition-all duration-300">
          <ul className="flex flex-col gap-4">
            {sections.map((section) => (
              <li key={section.name}>
                <Link
                  className="block text-lg py-2 hover:text-primary transition-colors"
                  href={section.link}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {section.name}
                </Link>
              </li>
            ))}
            <li key="separator">
              <Separator />
            </li>
            {pages.map((page) => (
              <li key={page.name}>
                <Link
                  className="block text-lg py-2 hover:text-primary transition-colors"
                  href={page.link}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
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
  <div className="w-full p-5 backdrop-filter backdrop-blur-lg shadow-sm shadow-gray-300 dark:shadow-gray-800 fixed z-10 transition-all duration-500">
    <div className="max-w-7xl mx-auto flex flex-row justify-between w-full">
      <div className="flex flex-row gap-1 p-1">
        <Link href="/">
          <ChevronLeftIcon className="size-8 text-xl text-primary" />
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
