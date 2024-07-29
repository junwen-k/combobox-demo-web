import { createLazyFileRoute } from "@tanstack/react-router";

import * as React from "react";
import {
  Button,
  ComboBox,
  Group,
  Input,
  type Key,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";

import { fruits } from "../fruits";

const ReactAriaComboboxExample = () => {
  const [value, setValue] = React.useState(fruits[0].value);
  const [inputValue, setInputValue] = React.useState(fruits[0].label);

  const handleSelectionChange = (key: Key | null) => {
    console.log("onSelectionChange", key);
    setValue(key?.toString() ?? "");
    setInputValue(fruits.find((fruit) => fruit.value === key)?.label ?? "");
  };

  const handleInputChange = (value: string) => {
    console.log("onInputChange", value);
    if (!value) {
      setValue("");
    }
    setInputValue(value);
  };

  return (
    <div className="grid justify-center gap-2">
      <div className="flex gap-2">
        <button
          className="inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 font-medium text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          type="button"
          onClick={() => setValue(fruits[0].value)}
        >
          Set value 🍎
        </button>
        <button
          className="inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 font-medium text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          type="button"
          onClick={() => setInputValue(fruits[0].label)}
        >
          Set input value 🍎
        </button>
      </div>
      <ComboBox
        selectedKey={value}
        onSelectionChange={handleSelectionChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
      >
        <details>
          <summary>Controlled</summary>
          <pre className="font-mono text-xs">
            {JSON.stringify(
              {
                value,
                inputValue,
              },
              undefined,
              2
            )}
          </pre>
        </details>
        <div className="w-96">
          <div className="space-y-2">
            <Label className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Fruit
            </Label>
            <Group className="flex gap-2">
              <Input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Search fruits..."
              />
              <Button>&#8595;</Button>
            </Group>
          </div>
        </div>
        <Popover className="z-50 w-[--trigger-width] rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none">
          <ListBox items={fruits}>
            {(fruit) => (
              <ListBoxItem
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[focused]:bg-accent data-[focused]:text-accent-foreground"
                id={fruit.value}
              >
                {fruit.label}
              </ListBoxItem>
            )}
          </ListBox>
        </Popover>
      </ComboBox>
    </div>
  );
};

export const Route = createLazyFileRoute("/react-aria")({
  component: ReactAriaComboboxExample,
});
