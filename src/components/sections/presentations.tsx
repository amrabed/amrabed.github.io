import { memo } from "react";
import { FaPersonChalkboard } from "react-icons/fa6";

import { Card, Separator } from "@heroui/react";

import { IconLink } from "@/components/icon-link";
import { Section } from "@/components/section";
import { Areas } from "@/components/skills";
import resume from "@/data/resume.json";

interface Presentation {
  id: string;
  title: string;
  event: string;
  date: string;
  links?: {
    slideshare?: string;
  };
  tags?: string[];
}

const PresentationCard = memo(
  ({ presentation }: { presentation: Presentation }) => {
    return (
      <Card id={presentation.id} className="card-container h-full">
        <Card.Header className="flex justify-between items-start gap-4 p-0 bg-transparent">
          <h3 className="card-title text-xl">{presentation.title}</h3>
        </Card.Header>

        <Card.Content className="p-0 mt-1 bg-transparent overflow-visible">
          <p className="text-primary font-medium text-sm italic">
            {presentation.event}
          </p>
          <div className="flex-grow"></div>
        </Card.Content>

        <Card.Footer className="flex flex-row justify-between items-center gap-2 bg-transparent mt-6 p-0 overflow-visible">
          <div className="flex flex-row items-center gap-2">
            {presentation.tags && (
              <>
                <Areas areas={presentation.tags} />
                <Separator orientation="vertical" />
              </>
            )}
            <span className="text-zinc-400 text-sm">
              {new Date(presentation.date).getFullYear()}
            </span>
          </div>
          <div className="flex flex-row items-center gap-4">
            {presentation.links?.slideshare && (
              <IconLink href={presentation.links.slideshare} title="Slides">
                <FaPersonChalkboard className="size-4" />
              </IconLink>
            )}
          </div>
        </Card.Footer>
      </Card>
    );
  },
);
PresentationCard.displayName = "PresentationCard";

export const PresentationsSection = memo(() => {
  const presentations = resume.presentations as Presentation[];

  if (!presentations || presentations.length === 0) return null;

  return (
    <Section
      id="presentations"
      title="Presentations"
      icon={<FaPersonChalkboard className="size-7" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {presentations.map((presentation) => (
          <PresentationCard key={presentation.id} presentation={presentation} />
        ))}
      </div>
    </Section>
  );
});
PresentationsSection.displayName = "PresentationsSection";
