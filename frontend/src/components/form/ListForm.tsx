import { CirclePlusIcon } from 'lucide-preact';
import React from 'preact/compat';
import { FormLabel } from './FormLabel';
import { FormInput } from './FormInput';

export type ListFormProps<T> = {
  items: T[];
  setItems: (_items: T[]) => void;
  renderItem: (
    _item: T,
    _setItem: (_item: T) => void,
    _removeItem: () => void
  ) => React.ReactNode;
  canCreateNewItem: boolean;
  createNewItem: () => T;
  label: string;
};

export const ListForm = <T,>({
  items,
  setItems,
  renderItem,
  canCreateNewItem,
  createNewItem,
  label,
}: ListFormProps<T>) => (
  <FormInput>
    <div className="flex flex-row gap-2 items-center">
      <FormLabel label={label} />
      {canCreateNewItem && (
        <CirclePlusIcon
          className="h-[0.9rem] w-auto mb-3 hover:cursor-pointer"
          onClick={() => setItems([...items, createNewItem()])}
        />
      )}
    </div>
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {renderItem(
            item,
            (newItem) =>
              setItems(items.map((i, idx) => (idx === index ? newItem : i))),
            () => setItems(items.filter((_, idx) => idx !== index))
          )}
        </React.Fragment>
      ))}
    </div>
  </FormInput>
);
