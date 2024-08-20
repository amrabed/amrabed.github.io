"use client";

import Link from "next/link";

import { FaGithub } from "react-icons/fa6";


import areas from "@/data/areas";
import skills from "@/data/skills";

const Card = ({ item }) => (
  <div className="flex-fit ml-6 font-medium w-screen md:w-1/2">
    <div className="dark:bg-gray-800 bg-gray-100 group-hover:bg-primary rounded-lg shadow-only transition-ease px-6 py-4">
      <h3 className="mb-3 font-semibold text-zinc text-2xl">
        <div className="flex  justify-between">
          <div className="flex md:flex-row gap-4 text-xl">
            <div className="text-primary dark:text-primary-dark">{item.name}</div>
            <ul className="flex flex-row gap-2 text-2xl">
              {item.tools.map((tool) => (
                <li title={tool} key={tool}>{skills[tool.toLowerCase()]?.icon}</li>
              ))}
            </ul>
          </div>
          <Link href={`https://github.com/${item.github}`} target="_blank">
            <FaGithub />
          </Link>
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
          {new Date(item.released).getFullYear()}
        </p>
      </div>
    </div>
  </div>
);

export default Card;
