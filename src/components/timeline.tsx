"use client";

import React, { useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

import { Position } from "@/types";

const Card = ({ position }: { position: Position }) => {
  const [isHidden, setHidden] = useState(true);
  const onClick = () => {
    setHidden(!isHidden);
  };

  return (
    <div className="flex-auto ml-6 z-10 font-medium">
      <div className="order-1 space-y-2 bg-gray-800 group-hover:bg-primary rounded-lg shadow-only transition-ease px-6 py-4">
        <h3 className="mb-3 font-semibold text-white text-lg">
          {position.title}
        </h3>
        <p className="pb-4 text-sm text-gray-100">
          {position.organization.name}
        </p>
        <hr />
        <ul className="">
          <li className="text-sm font-medium leading-snug tracking-wide text-gray-300 text-opacity-100">
            {position.tasks[0]}
          </li>
          {/* <button onClick={onClick}>
            <ChevronDownIcon className="size-6" hidden={!isHidden} />
            <ChevronUpIcon className="size-6" hidden={isHidden} />
          </button>
          {item.tasks.map((task) => (
            <li className={"text-sm font-medium leading-snug tracking-wide text-gray-300 text-opacity-100" + isHidden && "hidden"}>
              {task}
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

const Timeline = ({ positions }: { positions: Position[] }) => (
  <div className="flex w-100 justify-center">
    <ul className="list-none">
      {positions.map((position: Position) => (
        <li className="mb-5" key={position.id}>
          <div className="">
            <span className="relative left-5 xl:left-[-170px] xl:top-5 text-zinc">
              {position.duration}
            </span>
            <div
              className="border-r-4 border-black dark:border-gray-800 absolute h-full top-5"
              style={{ left: "9px" }}
            ></div>
          </div>
          <div className="flex group">
            <div className="bg-gray-800 dark:bg-gray-600 group-hover:bg-primary z-10 rounded-full border-4 border-black dark:border-gray-800 h-5 w-5">
              <div className="bg-black dark:bg-gray-800 h-1 w-6 items-center ml-4 mt-1"></div>
            </div>
            <Card position={position} />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default Timeline;
