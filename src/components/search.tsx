import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Modal, useOverlayState } from "@heroui/react";

export const Searchbar = ({
  placeholder,
  query,
  setQuery,
}: {
  placeholder: string;
  query: string;
  setQuery: (query: string) => void;
}) => (
  <div className="relative flex w-full">
    <label htmlFor="search" className="sr-only">
      Search
    </label>
    <input
      className="peer border-none rounded-lg bg-white dark:bg-slate-800 border border-gray-200 py-[9px] pl-10 pr-10 text-sm outline-none w-full"
      placeholder={placeholder}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      autoFocus
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
    />
    <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-zinc-900 dark:peer-focus:text-zinc-100" />
    {query && (
      <Button
        id="clear"
        variant="ghost"
        size="sm"
        onPress={() => setQuery("")}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 min-w-0 h-7 w-7"
      >
        <XMarkIcon className="size-4" />
      </Button>
    )}
  </div>
);

export const SearchIcon = (props: any) => {
  const state = useOverlayState();

  return (
    <Modal state={state}>
      <Button id="search" variant="ghost" isIconOnly onPress={state.open}>
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
