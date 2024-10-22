import { ReactNode } from "react";

import {
  AdjustmentsHorizontalIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  CheckboxGroup,
  useCheckbox,
  Chip,
  VisuallyHidden,
  tv,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

const checkbox = tv({
  slots: {
    base: "border-none bg-default-100 hover:bg-default-200",
    content: "text-foreground-500 hover:text-foreground",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-none bg-foreground hover:bg-primary",
        content: "text-white hover:text-zinc-100 pl-1",
      },
    },
  },
});

export const Selection = (props: any) => {
  const { children, isSelected, getBaseProps, getInputProps } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected });

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
        startContent={
          isSelected ? (
            <CheckIcon className="size-4 ml-1" color="white" />
          ) : null
        }
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
  <div className="flex flex-row gap-1 w-full">
    <CheckboxGroup
      className="gap-4"
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

export const Filter = ({ children }: { children: ReactNode }) => (
  <Popover
    offset={10}
    size="lg"
    placement="bottom"
    backdrop="opaque"
    className="dark:bg-slate-800"
  >
    <PopoverTrigger>
      <Button id="filter" variant="light" isIconOnly>
        <AdjustmentsHorizontalIcon className="size-6" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[500px] p-4 gap-6">{children}</PopoverContent>
  </Popover>
);
