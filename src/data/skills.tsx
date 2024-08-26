import { DiSwift } from "react-icons/di";
import { FaAndroid, FaAws, FaDocker, FaJava, FaPython } from "react-icons/fa";
import {
  SiCplusplus,
  SiFirebase,
  SiFlutter,
  SiGooglecloud,
  SiKotlin,
  SiKubernetes,
  SiTensorflow,
  SiScikitlearn,
  SiJavascript,
  SiTypescript,
  SiGnubash,
} from "react-icons/si";

import { Skill } from "@/types";

const skills: Record<string, Skill> = {
  python: {
    name: "Python",
    icon: <FaPython />,
    color: "#3776AB",
  },
  tensorflow: {
    name: "TensorFlow",
    icon: <SiTensorflow />,
    color: "#FF6F00",
  },
  "scikit-learn": {
    name: "Scikit-Learn",
    icon: <SiScikitlearn />,
    color: "#F7931E",
  },
  aws: {
    name: "AWS",
    icon: <FaAws />,
    color: "#FF9900",
  },
  "google cloud": {
    name: "Google Cloud",
    icon: <SiGooglecloud />,
    color: "#4285F4",
  },
  docker: {
    name: "Docker",
    icon: <FaDocker />,
    color: "#2496ED",
  },
  kubernetes: {
    name: "Kubernetes",
    icon: <SiKubernetes />,
    color: "#326CE5",
  },
  firebase: {
    name: "Firebase",
    icon: <SiFirebase />,
    color: "#FFC107",
  },
  android: {
    name: "Android",
    icon: <FaAndroid />,
    color: "#A4C639",
  },
  kotlin: {
    name: "Kotlin",
    icon: <SiKotlin />,
    color: "#7F52A2",
  },
  java: {
    name: "Java",
    icon: <FaJava />,
    color: "#B00040",
  },
  "c++": {
    name: "C/C++",
    icon: <SiCplusplus />,
    color: "#00599C",
  },
  swift: {
    name: "Swift",
    icon: <DiSwift />,
    color: "#FF9900",
  },
  flutter: {
    name: "Flutter",
    icon: <SiFlutter />,
    color: "#02569B",
  },
  javascript: {
    name: "JavaScript",
    icon: <SiJavascript />,
    color: "#F7DF1E",
  },
  typescript: {
    name: "TypeScript",
    icon: <SiTypescript />,
    color: "#3178C6",
  },
  bash: {
    name: "Bash",
    icon: <SiGnubash />,
    color: "#4EAA25",
  },
};

export default skills;
