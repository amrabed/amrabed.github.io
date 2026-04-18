"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect } from "react";

export const useUrlSync = <P,>(
  state: P,
  updateUrl: (params: URLSearchParams, state: P) => void,
) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    updateUrl(params, state);
    const newParams = params.toString();
    if (newParams !== searchParams.toString()) {
      replace(`${pathname}?${newParams}`, { scroll: false });
    }
  }, [state, replace, pathname, searchParams, updateUrl]);
};
