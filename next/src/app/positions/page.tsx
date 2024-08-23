import Link from "next/link";

import { Fragment } from "react";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import Section from "@/components/Section";
import Timeline from "@/components/timeline";
import HeaderProvider from "@/contexts/header";
import positions from "@/data/positions";

const Page = () => (
  <Fragment>
    <HeaderProvider>
      <Link href="/">
        <ChevronLeftIcon className="size-8 gap-4" />
      </Link>
    </HeaderProvider>
    <Section id="experience" title="Experience">
      <div className="flex text-center items-center content-center justify-center">
        <Timeline items={positions} />
      </div>
    </Section>
  </Fragment>
);

export default Page;
