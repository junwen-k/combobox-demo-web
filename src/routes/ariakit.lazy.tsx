import { createLazyFileRoute } from "@tanstack/react-router";

import * as Ariakit from "@ariakit/react";
import * as React from "react";

import { fruits } from "../fruits";

const ValueInspector = () => {
  const context = Ariakit.useComboboxContext();

  const state = context?.useState();

  return (
    <pre className="font-mono text-xs">
      {JSON.stringify(
        {
          selectedValue: state?.selectedValue,
          value: state?.value,
        },
        undefined,
        2
      )}
    </pre>
  );
};

const AriakitComboboxExample = () => {
  const [value, setValue] = React.useState(fruits[0].value);
  const [inputValue, setInputValue] = React.useState(fruits[0].label);

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
      <Ariakit.ComboboxProvider
        selectedValue={value}
        setSelectedValue={(v) => {
          console.log("setSelectedValue", v);
          setValue(v);
        }}
        value={inputValue}
        setValue={(v) => {
          console.log("setValue", v);
          setInputValue(v);
        }}
      >
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
          <div className="space-y-2">
            <Ariakit.ComboboxLabel className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Fruit
            </Ariakit.ComboboxLabel>
            <Ariakit.Combobox
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search fruits..."
            />
          </div>
          <Ariakit.ComboboxPopover
            gutter={4}
            sameWidth
            className="data-[leave]:fade-out-0 data-[enter]:fade-in-0 data-[leave]:zoom-out-95 data-[enter]:zoom-in-95 z-50 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[enter]:animate-in data-[leave]:animate-out"
          >
            {fruits.map((fruit) => (
              <Ariakit.ComboboxItem
                setValueOnClick={() => {
                  setInputValue(fruit.label);
                  return false;
                }}
                onSelect={() => setInputValue(fruit.label)}
                key={fruit.value}
                value={fruit.value}
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[active-item]:bg-accent data-[active-item]:text-accent-foreground data-[disabled]:opacity-50"
              >
                {fruit.label}
              </Ariakit.ComboboxItem>
            ))}
          </Ariakit.ComboboxPopover>
        </div>
      </Ariakit.ComboboxProvider>
    </div>
  );
};

export const Route = createLazyFileRoute("/ariakit")({
  component: AriakitComboboxExample,
});
