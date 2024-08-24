"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState, ChangeEvent } from "react";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Search = ({ placeholder }: { placeholder: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [query, setQuery] = useState<string>(searchParams.get("query") || "");

  useEffect(() => {
    // Update the URL when query changes
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [query, replace, pathname, searchParams]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div className="relative flex w-full md:w-1/2">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer rounded-lg border border-gray-200 py-[9px] pl-10 text-sm outline-none text-zinc-500 w-fit w-full"
        placeholder={placeholder}
        value={query}
        onChange={handleSearch}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      <button onClick={clearSearch}>
        <XMarkIcon className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </button>
    </div>
  );
};

export default Search;
