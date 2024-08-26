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
    icon: <CloudIcon />,
    color: colors.indigo,
  },
  "machine learning": {
    icon: <BiBrain className="text-2xl" />,
    color: colors.amber,
  },
  programming: {
    icon: <CodeBracketIcon />,
    color: colors.cyan,
  },
  mobile: {
    icon: <DevicePhoneMobileIcon />,
    color: "green",
  },
  devops: {
    icon: <Cog6ToothIcon />,
    color: colors.purple,
  },
  database: {
    icon: <CircleStackIcon />,
    color: "yellow",
  },
  web: {
    icon: <CiGlobe size="xl" />,
    color: colors.blue,
  },
  security: {
    icon: <ShieldCheckIcon />,
    color: "orange",
  },
};

export default areas;
