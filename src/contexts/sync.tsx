"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const useUrlSync = (
  state: any,
  updateUrl: (params: URLSearchParams, state: any) => void
) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    updateUrl(params, state);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [state, replace, pathname, searchParams, updateUrl]);
};
