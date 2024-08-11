import Link from "next/link";

import { sections } from "@/data/sections";

export const MobileNavbarLinks = () => (
    <div className='p-2 flex flex-col gap-2'>
        {sections.map((section) => (
            <Link
                className='text-lg p-2'
                href={section.link}
                key={section.name}
            >
                {section.name}
            </Link>
        ))}
    </div>

);

const NavbarLinks = () => (
    <div className='h-full flex gap-4'>
        {sections.map((section) => (
            <Link
                className={"text-primary dark:text-darkPrimary"}
                href={section.link}
                key={section.name}
            >
                <div className='h-full pb-1 hover:pb-0 px-2 flex items-center hover:border-b-4  border-primary dark:border-darkPrimary transition-all'>
                    {section.name}
                </div>
            </Link>
        ))}
    </div>
);

export default NavbarLinks;
