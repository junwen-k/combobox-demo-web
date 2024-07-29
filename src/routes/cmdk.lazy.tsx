import { createLazyFileRoute } from "@tanstack/react-router";

import { Command as CommandPrimitive, useCommandState } from "cmdk";
import * as React from "react";

import { fruits } from "../fruits";

const ValueInspector = () => {
  const state = useCommandState((state) => state);

  return (
    <pre className="font-mono text-xs">
      {JSON.stringify(
        {
          value: state.value,
          inputValue: state.search,
        },
        undefined,
        2
      )}
    </pre>
  );
};

const CmdkComboboxExample = () => {
  const [value, setValue] = React.useState("apple");
  const [inputValue, setInputValue] = React.useState("Apple");

  return (
    <CommandPrimitive className="grid justify-center gap-2">
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
          <summary>Internal</summary>
          <ValueInspector />
        </details>
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
      </div>
      <div className="w-96">
        <CommandPrimitive.Input
          value={inputValue}
          onValueChange={setInputValue}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search fruits..."
        />
        <CommandPrimitive.List className="z-50 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none">
          {fruits.map((fruit) => (
            <CommandPrimitive.Item
              key={fruit.value}
              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
              onSelect={() => {
                setValue(fruit.value);
                setInputValue(fruit.label);
              }}
            >
              {fruit.label}
            </CommandPrimitive.Item>
          ))}
        </CommandPrimitive.List>
      </div>
    </CommandPrimitive>
  );
};

export const Route = createLazyFileRoute("/cmdk")({
  component: CmdkComboboxExample,
});
