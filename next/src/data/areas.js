import { BiBrain } from "react-icons/bi";
import colors from "tailwindcss/colors";

import {
  CloudIcon,
  DevicePhoneMobileIcon,
  CircleStackIcon,
  ShieldCheckIcon,
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
  mobile: {
    icon: <DevicePhoneMobileIcon />,
    color: "green",
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
