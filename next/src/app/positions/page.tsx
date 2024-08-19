"use client";

import Link from "next/link";

import React, { Fragment, useContext } from "react";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import Section from "@/components/Section";
import Timeline from "@/components/timeline";
import ToggleThemeButton from "@/components/toggleThemeButton";
import HeaderProvider from "@/contexts/header";
import { ThemeContext } from "@/contexts/theme";
import positions from "@/data/positions";

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
      <Section id="experience" title="Experience">
        <div className="flex text-center items-center content-center justify-center">
          <Timeline items={positions} />
        </div>
      </Section>
    </Fragment>
  );
};

export default Page;
