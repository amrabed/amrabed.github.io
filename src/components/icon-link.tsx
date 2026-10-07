"use client";

import Link from "next/link";
import React from "react";
import { Tooltip } from "@heroui/react";

import { sendGAEvent } from "@next/third-parties/google";

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
        aria-label={`${title} (opens in a new tab)`}
        className="icon-link"
        onClick={() => sendGAEvent({ event: "outbound_click", link_title: title, link_url: href })}
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
