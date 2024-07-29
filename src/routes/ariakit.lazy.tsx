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
    <div className="grid gap-2 justify-center">
      <Ariakit.ComboboxProvider
        selectedValue={value}
        setSelectedValue={setValue}
        value={inputValue}
        setValue={setInputValue}
      >
        <div className="flex gap-2">
          <details open>
            <summary>Internal</summary>
            <ValueInspector />
          </details>
          <details open>
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
            <Ariakit.ComboboxLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Fruit
            </Ariakit.ComboboxLabel>
            <Ariakit.Combobox
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search fruits..."
            />
          </div>
          <Ariakit.ComboboxPopover
            gutter={4}
            sameWidth
            className="z-50 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[enter]:animate-in data-[leave]:animate-out data-[leave]:fade-out-0 data-[enter]:fade-in-0 data-[leave]:zoom-out-95 data-[enter]:zoom-in-95"
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
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[active-item]:bg-accent data-[active-item]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
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
