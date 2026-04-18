import { Card, Separator } from "@heroui/react";

import { Tags, Tools } from "@/components/skills";
import { Position } from "@/types";

const PositionView = ({ position }: { position: Position }) => (
  <Card className="w-full bg-transparent border-2 border-slate-500 ml-6 shadow-none">
    <Card.Header className="flex gap-3">
      <div className="flex flex-col">
        <p className="text-md">{position.title}</p>
        <p className="text-small text-slate-500">
          {position.organization.name}
        </p>
      </div>
    </Card.Header>
    <Separator />
    <Card.Content>
      <ul>
        {position.tasks.map((task) => (
          <li
            key={task}
            className="text-sm font-medium leading-snug tracking-wide text-slate-500 dark:text-slate-400"
          >
            {task}
          </li>
        ))}
      </ul>
    </Card.Content>
    <Separator />
    <Card.Footer className="justify-between">
      <div className="flex flex-row">
        <Tags tags={position.tags} />
        <Separator orientation="vertical" className="h-6 mx-2" />
        <Tools tools={position.skills} />
      </div>
      <ul className="flex flex-row gap-2 text-zinc-400">
        {position.roles.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>
    </Card.Footer>
  </Card>
);

const Timeline = ({ positions }: { positions: Position[] }) => (
  <div className="flex w-full justify-center">
    <ul className="w-full">
      {positions.map((position: Position) => (
        <li className="group mb-5 w-full relative" key={position.id}>
          <div
            className="absolute left-[9px] top-5 bottom-0 border-r-2 border-slate-500"
            style={{ height: "calc(100% + 1.25rem)" }}
          ></div>
          <div>
            <span className="relative left-5 xl:left-[-170px] xl:top-5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-focus:text-zinc-900 dark:group-focus:text-zinc-100">
              {position.duration.start + " - " + position.duration.end}
            </span>
          </div>
          <div className="flex relative">
            <div className="bg-gray-800 dark:bg-gray-600 group-hover:bg-primary z-10 rounded-full border-2 border-slate-500 h-5 w-5">
              <div className="bg-slate-500 h-0.5 w-7 items-center ml-4 mt-2"></div>
            </div>
            <PositionView position={position} />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default Timeline;
