import { Role } from "@/types";

const roles: Record<string, Role> = {
  engineer: {
    name: "Engineer",
    color: "blue",
  },
  researcher: {
    name: "Researcher",
    color: "orange",
  },
  instructor: {
    name: "Instructor",
    color: "green",
  },
};

export default roles;
