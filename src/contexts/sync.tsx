"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect } from "react";

export const useUrlSync = <P extends object>(
  state: P,
  updateUrl: (params: URLSearchParams, state: P) => void,
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
