import Link from "next/link";

import sections from "@/data/sections";

export const MobileNavbarLinks = () => (
  <div className="p-3 flex flex-col gap-3">
    {sections.map((section) => (
      <Link
        className="text-lg p-2 hover:text-primary hover:dark:text-primary-dark"
        href={section.link}
        key={section.name}
      >
        {section.name}
      </Link>
    ))}
  </div>
);

const NavbarLinks = () => (
  <div className="h-full flex gap-4">
    {sections.map((section) => (
      <Link
        className={"hover:text-primary hover:dark:text-primary-dark"}
        href={section.link}
        key={section.name}
      >
        <div className="h-full pb-1 hover:pb-0 px-2 flex items-center hover:border-b-2  border-primary dark:border-primary-dark transition-all">
          {section.name}
        </div>
      </Link>
    ))}
  </div>
);

export default NavbarLinks;
