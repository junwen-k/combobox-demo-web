import { createLazyFileRoute } from "@tanstack/react-router";

import clsx from "clsx";
import { useCombobox } from "downshift";
import * as React from "react";

import { fruits } from "../fruits";

const DownshiftComboboxExample = () => {
  const [value, setValue] = React.useState("apple");
  const [inputValue, setInputValue] = React.useState("Apple");

  const [items, setItems] = React.useState(fruits);

  const selected = fruits.find((fruit) => fruit.value === value) ?? null;

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    selectedItem: selected,
    onSelectedItemChange: ({ selectedItem }) =>
      setValue(selectedItem?.value ?? ""),
    inputValue,
    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue);
      setItems(
        fruits.filter((fruit) =>
          fruit.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    },
    items,
    itemToString: (item) => item?.label ?? "",
  });

  return (
    <div className="grid justify-center gap-2">
      <details open>
        <summary>Controlled</summary>
        <pre className="font-mono text-xs">
          {JSON.stringify(
            {
              "selected (derived)": selected,
              items,
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
          <label
            {...getLabelProps({
              className:
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            })}
          >
            Fruit
          </label>
          <div className="flex gap-2">
            <input
              {...getInputProps({
                placeholder: "Search fruits...",
                className:
                  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              })}
            />
            <button
              aria-label="toggle menu"
              type="button"
              {...getToggleButtonProps()}
            >
              {isOpen ? <>&#8593;</> : <>&#8595;</>}
            </button>
          </div>
        </div>
        <ul
          {...getMenuProps({
            className: clsx(
              "z-50 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none",
              !isOpen && "hidden"
            ),
          })}
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                className={clsx(
                  highlightedIndex === index &&
                    "bg-accent text-accent-foreground",
                  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                )}
                key={item.value}
                {...getItemProps({ item, index })}
              >
                <span>{item.label}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/downshift")({
  component: DownshiftComboboxExample,
});
