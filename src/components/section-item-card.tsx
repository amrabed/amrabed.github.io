"use client";

import Image from "next/image";

import React from "react";

interface SectionItemCardProps {
  href: string;
  image: {
    src: string;
    alt: string;
  };
  title: string;
  subtitle: string;
  footer: string;
}

export const SectionItemCard = ({
  href,
  image,
  title,
  subtitle,
  footer,
}: SectionItemCardProps) => {
  return (
    <div className="transition-all duration-700">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
      >
        <div className="section-item p-3">
          <Image src={image.src} alt={image.alt} width={150} height={150} />
          <p className="text-xl md:text-2xl text-foreground">{title}</p>
          <p className="dark:text-primary-dark text-primary">{subtitle}</p>
          <p className="text-secondary">{footer}</p>
        </div>
      </a>
    </div>
  );
};
