import { BiBrain } from "react-icons/bi";
import { CiGlobe } from "react-icons/ci";
import colors from "tailwindcss/colors";

import {
  CloudIcon,
  DevicePhoneMobileIcon,
  CircleStackIcon,
  ShieldCheckIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import { Area } from "@/types";

const areas: Record<string, Area> = {
  cloud: {
    name: "Cloud",
    icon: <CloudIcon />,
    color: colors.indigo,
  },
  "machine learning": {
    name: "Machine Learning",
    icon: <BiBrain className="text-2xl" />,
    color: colors.amber,
  },
  programming: {
    name: "Programming",
    icon: <CodeBracketIcon />,
    color: colors.cyan,
  },
  mobile: {
    name: "Mobile",
    icon: <DevicePhoneMobileIcon />,
    color: "green",
  },
  devops: {
    name: "DevOps",
    icon: <Cog6ToothIcon />,
    color: colors.purple,
  },
  database: {
    name: "Database",
    icon: <CircleStackIcon />,
    color: "yellow",
  },
  web: {
    name: "Web",
    icon: <CiGlobe size="xl" />,
    color: colors.blue,
  },
  security: {
    name: "Security",
    icon: <ShieldCheckIcon />,
    color: "orange",
  },
};

export default areas;
