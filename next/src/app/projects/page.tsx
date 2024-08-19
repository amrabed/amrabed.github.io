"use client";

import Link from "next/link";

import React, { Fragment, useContext } from "react";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import Section from "@/components/Section";
import Card from "@/components/card";
import ToggleThemeButton from "@/components/toggleThemeButton";
import HeaderProvider from "@/contexts/header";
import { ThemeContext } from "@/contexts/theme";
import projects from "@/data/projects";

const Page = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Fragment>
      <HeaderProvider>
        <Link href="/">
          <ChevronLeftIcon className="size-8 gap-4" />
        </Link>
        <ToggleThemeButton theme={theme} toggleTheme={toggleTheme} />
      </HeaderProvider>
      <Section id="projects" title="Projects">
        {projects.map((project) => (
          <Card key={project.id} item={project} />
        ))}
      </Section>
    </Fragment>
  );
};

export default Page;
