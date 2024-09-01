import {
  FaGithub,
  FaGoodreadsG,
  FaGoogleScholar,
  FaLinkedinIn,
  FaMedium,
  FaStackOverflow,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { TbBrandStackshare } from "react-icons/tb";

const profiles = [
  {
    icon: <FaLinkedinIn />,
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/amrabed",
  },
  {
    icon: <FaGithub />,
    name: "GitHub",
    link: "https://www.github.com/amrabed",
  },
  {
    icon: <FaGoogleScholar />,
    name: "Google Scholar",
    link: "https://scholar.google.com/citations?user=vdrgnAYAAAAJ",
  },
  {
    icon: <FaStackOverflow />,
    name: "Stack Overflow",
    link: "https://stackoverflow.com/users/2070636/amrabed",
  },
  {
    icon: <FaGoodreadsG />,
    name: "Goodreads",
    link: "https://goodreads.com/user/show/15582377-amr-abed",
  },
  {
    icon: <TbBrandStackshare />,
    name: "StackShare",
    link: "https://stackshare.io/amrabed",
  },
  {
    icon: <FaMedium />,
    name: "Medium",
    link: "https://amrabed.medium.com",
  },
  {
    icon: <FaYoutube />,
    name: "YouTube",
    link: "https://youtube.com/@amr-abed",
  },
  {
    icon: <FaXTwitter />,
    name: "X",
    link: "https://twitter.com/amr_abed",
  },
];

export default profiles;
