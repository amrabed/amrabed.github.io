import { useId, useEffect, useRef, useState, type ComponentProps } from "react";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Modal, useOverlayState } from "@heroui/react";

export const Searchbar = ({
  placeholder,
  query,
  setQuery,
  className,
}: {
  placeholder: string;
  query: string;
  setQuery: (query: string) => void;
  className?: string;
}) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isSearchShortcut =
        (e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/";

      if (isSearchShortcut) {
        if (
          document.activeElement?.tagName === "INPUT" ||
          document.activeElement?.tagName === "TEXTAREA" ||
          (document.activeElement as HTMLElement)?.isContentEditable
        ) {
          return;
        }

        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative flex w-full">
      <label htmlFor={inputId} className="sr-only">
        Search
      </label>
      <input
        id={inputId}
        ref={inputRef}
        className={`peer border-none bg-white dark:bg-slate-800 border border-gray-200 py-[9px] pl-10 pr-10 text-sm outline-none w-full ${className}`}
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        maxLength={100}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoFocus
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-zinc-900 dark:peer-focus:text-zinc-100" />
      {!isFocused && !query && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
          <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-300 rounded-lg dark:bg-slate-700 dark:text-slate-400 dark:border-slate-600">
            /
          </kbd>
        </div>
      )}
      {query && (
        <Button
          id="clear"
          variant="ghost"
          size="sm"
          aria-label="Clear search"
          onPress={() => setQuery("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 min-w-0 h-7 w-7"
        >
          <XMarkIcon className="size-4" />
        </Button>
      )}
    </div>
  );
};

export const SearchIcon = (props: ComponentProps<typeof Searchbar>) => {
  const state = useOverlayState();

  return (
    <Modal state={state}>
      <Button
        id="search-trigger"
        variant="ghost"
        isIconOnly
        onPress={state.open}
        aria-label="Open search"
        aria-haspopup="dialog"
      >
        <MagnifyingGlassIcon className="size-6" />
      </Button>
      <Modal.Backdrop variant="transparent">
        <Modal.Container placement="top">
          <Modal.Dialog>
            <Modal.Body>
              <Searchbar {...props} />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
