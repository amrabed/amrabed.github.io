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

const Links = ({ item }) => (
  <div id="links" className="flex flex-row gap-2 text-2xl text-zinc">
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
);

const Tools = ({ tools }) => (
  <ul className="flex flex-row gap-2 text-2xl">
    {tools.map((tool) => {
      const icon = skills[tool.toLowerCase()]?.icon;
      return (
        icon && (
          <li title={tool} key={tool}>
            {icon}
          </li>
        )
      );
    })}
  </ul>
);

const Tags = ({ tags }) => (
  <ul className="flex flex-row gap-2 p-1 text-md">
    {tags.map((tag) => (
      <li key={tag} className="size-6 text-zinc" title={tag}>
        {areas[tag.toLowerCase()]?.icon}
      </li>
    ))}
  </ul>
);

const Roles = ({ roles }) => (
  <ul className="flex flex-row gap-2">
    {roles.map((role) => (
      <li key={role}>
        <label className="text-sm text-zinc-500">{role}</label>
      </li>
    ))}
  </ul>
);

const Card = ({ item }) => (
  <div className="group overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 md:gap-8 hover:border-zinc-400/50 border-zinc-600 p-4">
    <h3 className="mb-3 font-semibold text-zinc">
      <div className="flex justify-between">
        <div className="flex md:flex-row flex-col gap-4">
          <div className="text-primary dark:text-primary-dark text-lg md:text-xl">
            {item.name}
          </div>
          <Tools tools={item.tools} />
        </div>
        <Links item={item} />
      </div>
    </h3>
    <p className="pb-4 xl:h-20 text-sm text-zinc">{item.description}</p>
    <Tags tags={item.tags} />
    <div className="flex flex-row justify-between">
      <Roles roles={item.roles} />
      <p className="text-zinc-500 text-end text-md">
        {new Date(item.date).getFullYear()}
      </p>
    </div>
  </div>
);

export default Card;
