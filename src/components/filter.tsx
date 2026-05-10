import { ReactNode } from "react";

import {
  AdjustmentsHorizontalIcon,
  CheckIcon,
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
    base: "border-none bg-default-100 hover:bg-default-200 dark:bg-slate-700/50 dark:hover:bg-slate-700",
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
                  <CheckIcon className="size-4" color="white" />
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
                <span className="size-4 flex items-center">{v.icon}</span>
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
}: {
  children: ReactNode;
  className?: string;
}) => (
  <Popover>
    <Button
      id="filter-trigger"
      variant="ghost"
      isIconOnly
      aria-label="Open filters"
      aria-haspopup="dialog"
      className={className}
    >
      <AdjustmentsHorizontalIcon className="size-6" />
    </Button>
    <Popover.Content
      offset={10}
      placement="bottom"
      className="dark:bg-slate-800 rounded-3xl"
    >
      <Popover.Dialog className="flex flex-col w-[90vw] max-w-[500px] p-6 gap-8">
        {children}
      </Popover.Dialog>
    </Popover.Content>
  </Popover>
);
