import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Search = ({
  placeholder,
  query,
  setQuery,
}: {
  placeholder: string;
  query: string;
  setQuery: (query: string) => void;
}) => (
  <div className="relative flex w-full md:w-1/2">
    <label htmlFor="search" className="sr-only">
      Search
    </label>
    <input
      className="peer rounded-lg border border-gray-200 py-[9px] pl-10 text-sm outline-none text-zinc-500 w-fit w-full"
      placeholder={placeholder}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-zinc-900 dark:peer-focus:text-zinc-100" />
    <button
      onClick={() => setQuery("")}
      className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900 dark:peer-focus:text-zinc-100"
    >
      <XMarkIcon />
    </button>
  </div>
);

export default Search;
