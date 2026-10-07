import { Button, Tooltip } from "@heroui/react";

import { profiles as defaultProfiles } from "@/lib/data";
import type { Profile } from "@/types";

interface FooterProps {
  profiles?: Profile[];
}

export function Footer({ profiles = defaultProfiles }: FooterProps = {}) {
  return (
    <footer
      data-pagefind-ignore="all"
      className="w-full bg-background border-t border-divider transition-colors duration-300 py-12 px-6 mt-16"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left order-2 md:order-1">
          <p className="text-sm font-medium text-heading">
            © {new Date().getFullYear()} Amr Abed
          </p>
          <p className="text-xs text-muted">
            Built with Next.js, Tailwind CSS, and HeroUI
          </p>
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-2 order-1 md:order-2">
          {profiles.map((profile) => (
            <Tooltip key={profile.name}>
              <Tooltip.Trigger>
                <a
                  href={profile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    isIconOnly
                    aria-label={`${profile.name} (opens in a new tab)`}
                    className="text-muted hover:text-primary rounded-full [&_svg]:size-4"
                  >
                    {profile.icon}
                  </Button>
                </a>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <Tooltip.Arrow />
                {profile.name}
              </Tooltip.Content>
            </Tooltip>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
