import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

export const match = (values: string[], query: string) => {
  return values.find((value) => value.toLowerCase().includes(query));
};

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
      className="peer border-none rounded-lg bg-white dark:bg-slate-800 border border-gray-200 py-[9px] pl-10 text-sm outline-none w-full"
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

export const SearchIcon = (props: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly variant="light" onClick={onOpen}>
        <MagnifyingGlassIcon className="size-6" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top"
        backdrop="transparent"
        hideCloseButton
      >
        <ModalContent>
          <ModalBody>
            <Searchbar {...props} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
