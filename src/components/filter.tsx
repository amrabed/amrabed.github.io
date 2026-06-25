import { ReactNode, useState } from "react";

import {
  AdjustmentsHorizontalIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  CheckboxGroup,
  Checkbox,
  Label,
  Chip,
  tv,
  Popover,
} from "@heroui/react";
import { VisuallyHidden } from "@react-aria/visually-hidden";

const checkbox = tv({
  slots: {
    base: "filter-chip group-data-[focus-visible=true]:filter-chip-focus group-data-[pressed=true]:filter-chip-pressed",
    content: "text-foreground-500 hover:text-foreground",
  },
  variants: {
    isSelected: {
      true: {
        base: "filter-chip-selected",
        content: "text-white hover:text-zinc-100 pl-1",
      },
      false: {
        base: "filter-chip-unselected",
      },
    },
  },
});

export const Selection = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  return (
    <Checkbox value={value} className="group">
      {(state) => {
        const styles = checkbox({ isSelected: state.isSelected });
        return (
          <div className="flex items-center">
            <VisuallyHidden>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
            </VisuallyHidden>
            <Chip className={styles.base()} variant="soft">
              <div className="flex items-center gap-1">
                {state.isSelected && (
                  <CheckIcon
                    className="size-4"
                    color="white"
                    aria-hidden="true"
                  />
                )}
                <Chip.Label className={styles.content()}>{children}</Chip.Label>
              </div>
            </Chip>
          </div>
        );
      }}
    </Checkbox>
  );
};

export const Selections = ({
  label,
  values,
  selected,
  setSelected,
}: {
  label: string;
  values: { id: string; name: string; icon?: ReactNode }[];
  selected: string[];
  setSelected: (values: string[]) => void;
}) => (
  <div className="flex flex-row gap-1 w-full">
    <CheckboxGroup
      className="gap-4 w-full"
      value={selected}
      onChange={(values) => setSelected(values as string[])}
    >
      <Label className="text-sm font-medium text-slate-500 uppercase tracking-wider">
        {label}
      </Label>
      <div className="flex flex-wrap gap-2 flex-row">
        {values.map((v) => (
          <Selection key={v.id} value={v.id}>
            <div className="flex items-center gap-2">
              {v.icon && (
                <span className="size-4 flex items-center" aria-hidden="true">
                  {v.icon}
                </span>
              )}
              {v.name}
            </div>
          </Selection>
        ))}
      </div>
    </CheckboxGroup>
  </div>
);

export const Filter = ({
  children,
  className,
  activeCount = 0,
}: {
  children: ReactNode;
  className?: string;
  activeCount?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <Button
          id="filter-trigger"
          variant="ghost"
          isIconOnly
          aria-label="Open filters"
          aria-haspopup="dialog"
          className={`relative ${className}`}
        >
          <AdjustmentsHorizontalIcon className="size-6" />
          {activeCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-800">
              {activeCount}
            </span>
          )}
        </Button>
      </Popover.Trigger>
      <Popover.Content
        offset={10}
        placement="top"
        className="dark:bg-slate-800 rounded-3xl"
      >
        <Popover.Dialog className="flex flex-col w-[90vw] max-w-[500px] p-6 gap-8 max-h-[70vh] overflow-y-auto relative">
          <Button
            variant="ghost"
            isIconOnly
            size="sm"
            onPress={() => setIsOpen(false)}
            className="absolute right-4 top-4 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 min-w-0 h-8 w-8 z-10"
            aria-label="Close filters"
          >
            <XMarkIcon className="size-5" />
          </Button>
          {children}
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
};
