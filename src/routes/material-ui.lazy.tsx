import { createLazyFileRoute } from "@tanstack/react-router";

import { useAutocomplete } from "@mui/base/useAutocomplete";
import * as React from "react";

import { fruits } from "../fruits";

const MaterialComboboxExample = () => {
  const [value, setValue] = React.useState(fruits[0].value);
  const [inputValue, setInputValue] = React.useState(fruits[0].label);

  const selected = React.useMemo(
    () => fruits.find((fruit) => fruit.value === value) ?? null,
    [value]
  );

  const {
    value: valueInternal,
    inputValue: inputValueInternal,
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    options: fruits,
    getOptionLabel: (fruit) => fruit.label,
    inputValue,
    onInputChange: (event, inputValue) => {
      console.log("onInputChange", event, inputValue);
      setInputValue(inputValue);
    },
    value: selected,
    onChange: (event, selectedItem) => {
      console.log("onChange", event, selectedItem);
      setValue(selectedItem?.value ?? "");
    },
  });

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
          <summary>Internal</summary>
          <pre className="font-mono text-xs">
            {JSON.stringify(
              {
                groupedOptions,
                value: valueInternal,
                inputValue: inputValueInternal,
              },
              undefined,
              2
            )}
          </pre>
        </details>
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
      <div className="w-96">
        <div className="space-y-2" {...getRootProps()}>
          <label
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            {...getInputLabelProps()}
          >
            Fruit
          </label>
          <input
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search fruits..."
            {...getInputProps()}
          />
        </div>
        {groupedOptions.length > 0 && (
          <ul
            className="z-50 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none"
            {...getListboxProps()}
          >
            {(groupedOptions as typeof fruits).map((option, index) => {
              const { key, ...optionProps } = getOptionProps({
                option,
                index,
              }) as React.HTMLAttributes<HTMLLIElement> & { key: React.Key };
              return (
                <li
                  key={key}
                  {...optionProps}
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:font-bold data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&.Mui-focused]:bg-accent [&.Mui-focused]:text-accent-foreground"
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/material-ui")({
  component: MaterialComboboxExample,
});
