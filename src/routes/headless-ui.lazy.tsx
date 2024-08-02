import { createLazyFileRoute } from "@tanstack/react-router";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import * as React from "react";

import { fruits } from "../fruits";

const HeadlessUIComboboxExample = () => {
  const [value, setValue] = React.useState<string | null>(fruits[0].value);
  const [inputValue, setInputValue] = React.useState(fruits[0].label);

  const selected = React.useMemo(
    () => fruits.find((fruit) => fruit.value === value) ?? null,
    [value]
  );

  const filteredFruits =
    inputValue === ""
      ? fruits
      : fruits.filter((fruit) =>
          fruit.label.toLowerCase().includes(inputValue.toLowerCase())
        );

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
      <div className="flex gap-2">
        <details>
          <summary>Controlled</summary>
          <pre className="font-mono text-xs">
            {JSON.stringify(
              {
                "selected (derived)": selected,
                value,
                inputValue,
              },
              undefined,
              2
            )}
          </pre>
        </details>
      </div>
      <Combobox
        value={value}
        onChange={(v) => {
          console.log("Combobox:onChange", v);
          setValue(v);
        }}
        onClose={() => setInputValue("")}
      >
        <ComboboxInput
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Assignee"
          displayValue={() => selected?.label ?? ""}
          onChange={(event) => {
            console.log("ComboboxInput:onChange", event);
            setInputValue(event.target.value);
          }}
        />
        <ComboboxOptions
          anchor="bottom"
          className="z-50 w-[--input-width] rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none"
        >
          {filteredFruits.map((fruit) => (
            <ComboboxOption
              key={fruit.value}
              value={fruit.value}
              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:font-bold data-[disabled=true]:pointer-events-none data-[focus]:bg-accent data-[focus]:text-accent-foreground data-[disabled=true]:opacity-50"
            >
              {fruit.label}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};

export const Route = createLazyFileRoute("/headless-ui")({
  component: HeadlessUIComboboxExample,
});
