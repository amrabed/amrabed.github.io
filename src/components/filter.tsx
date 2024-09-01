import { ReactNode } from "react";

import { CheckIcon } from "@heroicons/react/24/outline";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import {
  CheckboxGroup,
  useCheckbox,
  Chip,
  VisuallyHidden,
  tv,
} from "@nextui-org/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

const checkbox = tv({
  slots: {
    base: "border-default hover:bg-default-200",
    content: "text-default-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
        content: "text-primary-white pl-1",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

export const Selection = (props: any) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        startContent={isSelected ? <CheckIcon className="size-4 ml-1" /> : null}
        variant="faded"
      >
        {children}
      </Chip>
    </label>
  );
};

export const Selections = ({
  label,
  values,
  selected,
  setSelected,
}: {
  label: string;
  values: string[];
  selected: string[];
  setSelected: (previous: string[]) => void;
}) => (
  <div className="flex flex-col gap-1 w-full">
    <CheckboxGroup
      className="gap-1"
      label={label}
      orientation="horizontal"
      value={selected}
      onChange={setSelected}
    >
      {values.map((value) => (
        <Selection key={value} value={value.toLowerCase()}>
          {value}
        </Selection>
      ))}
    </CheckboxGroup>
  </div>
);

export const Filter = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly className="bg-slate-800" onPress={onOpen}>
        <AdjustmentsHorizontalIcon className="size-6" />
      </Button>
      <Modal isOpen={isOpen} placement="top" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Filter</ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
