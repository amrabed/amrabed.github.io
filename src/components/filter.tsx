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
  Popover,
} from "@heroui/react";
import { VisuallyHidden } from "@react-aria/visually-hidden";

export const Selection = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  return (
    <Checkbox value={value}>
      {(state) => {
        return (
          <Checkbox.Content className="flex items-center filter-chip-wrapper">
            <VisuallyHidden>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
            </VisuallyHidden>
            <Chip
              className="filter-chip"
              variant="soft"
              data-selected={state.isSelected || undefined}
            >
              <div className="flex items-center gap-1">
                {state.isSelected && (
                  <CheckIcon
                    className="size-4"
                    color="white"
                    aria-hidden="true"
                  />
                )}
                <Chip.Label className="filter-chip-label">
                  {children}
                </Chip.Label>
              </div>
            </Chip>
          </Checkbox.Content>
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
      <Label className="filter-label">{label}</Label>
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
          className={`filter-trigger ${className}`}
        >
          <AdjustmentsHorizontalIcon className="size-6" />
          {activeCount > 0 && (
            <span className="filter-badge">{activeCount}</span>
          )}
        </Button>
      </Popover.Trigger>
      <Popover.Content
        offset={10}
        placement="top"
        className="dark:bg-slate-800 rounded-3xl"
      >
        <Popover.Dialog className="filter-dialog">
          <Button
            variant="ghost"
            isIconOnly
            size="sm"
            onPress={() => setIsOpen(false)}
            className="filter-close-btn"
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
