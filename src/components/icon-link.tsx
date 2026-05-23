"use client";

import Link from "next/link";
import React from "react";
import { Tooltip } from "@heroui/react";

interface IconLinkProps {
  href: string;
  title: string;
  children: React.ReactNode;
}

export const IconLink = ({ href, title, children }: IconLinkProps) => (
  <Tooltip>
    <Tooltip.Trigger>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        className="icon-link"
      >
        {children}
      </Link>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <Tooltip.Arrow />
      {title}
    </Tooltip.Content>
  </Tooltip>
);
