"use client";

import Link from "next/link";

import { BiLogoPlayStore } from "react-icons/bi";
import {
  FaGithub,
  FaYoutube,
  FaApple,
  FaLink,
  FaSlideshare,
} from "react-icons/fa6";
import { RiSlideshow2Line } from "react-icons/ri";

import { DocumentIcon } from "@heroicons/react/24/outline";

import areas from "@/data/areas";
import skills from "@/data/skills";

const IconLink = ({ title, url, children }) =>
  url && (
    <Link title={title ? title : null} href={url} target="_blank">
      {children}
    </Link>
  );

const Card = ({ item }) => (
  <div className="flex-fit ml-6 font-medium w-screen lg:w-1/2">
    <div className="dark:bg-gray-800 bg-gray-100 group-hover:bg-primary rounded-lg shadow-only transition-ease px-6 py-4">
      <h3 className="mb-3 font-semibold text-zinc">
        <div className="flex justify-between">
          <div className="flex md:flex-row flex-col gap-4">
            <div className="text-primary dark:text-primary-dark text-lg md:text-xl">
              {item.name}
            </div>
            <ul className="flex flex-row gap-2 text-2xl">
              {item.tools.map((tool) => (
                <li title={tool} key={tool}>
                  {skills[tool.toLowerCase()]?.icon}
                </li>
              ))}
            </ul>
          </div>
          <div id="links" className="flex flex-row gap-2 text-2xl">
            <IconLink url={item.homepage} title="homepage">
              <FaLink />
            </IconLink>
            <IconLink url={item.app} title="app">
              {item.app?.includes("apple") ? <FaApple /> : <BiLogoPlayStore />}
            </IconLink>
            <IconLink url={item.publication} title="publication">
              <DocumentIcon className="size-6" />
            </IconLink>
            <IconLink url={item.presentation} title="demo">
              <RiSlideshow2Line />
            </IconLink>
            <IconLink url={item.demo} title="demo">
              <FaYoutube />
            </IconLink>
            <IconLink
              url={item.github ? "https://github.com/" + item.github : null}
              title="github"
            >
              <FaGithub />
            </IconLink>
          </div>
        </div>
      </h3>
      <p className="pb-4 text-sm text-zinc">{item.description}</p>
      <ul className="flex flex-row gap-2 p-1 text-md">
        {item.tags.map((tag) => (
          <li key={tag} className="size-6 text-zinc" title={tag}>
            {areas[tag.toLowerCase()]?.icon}
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <ul className="flex flex-row justify-start">
          {item.roles.map((role) => (
            <li key={role}>
              <p className="p-1 text-sm text-zinc-500">{role}</p>
            </li>
          ))}
        </ul>

        <p className="text-zinc-500 text-end">
          {new Date(item.date).getFullYear()}
        </p>
      </div>
    </div>
  </div>
);

export default Card;
