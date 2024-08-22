import { color } from "framer-motion";

import { BiBrain } from "react-icons/bi";
import colors from "tailwindcss/colors";

import {
  CloudIcon,
  DevicePhoneMobileIcon,
  CircleStackIcon,
  ShieldCheckIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const areas = {
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
  iot: {
    color: "purple",
  },
  security: {
    icon: <ShieldCheckIcon />,
    color: "orange",
  },
};

export default areas;
