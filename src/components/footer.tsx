import { profiles } from "@/lib/data";

import Social from "./social";

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-slate-950 transition-colors duration-500 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2 order-2 md:order-1">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            © {new Date().getFullYear()} Amr Abed
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 order-1 md:order-2">
          <Social profiles={profiles} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
