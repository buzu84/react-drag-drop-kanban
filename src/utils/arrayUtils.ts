type Item = {
  id: string
}

// variable TItem extends Item - it means it constrained generic to have the fields that are defined on the Item type, in this case the id field.
export const findItemIndexById = <TItem extends Item>(
  items: TItem[],
  id: string
) => {
  return items.findIndex((item: TItem) => item.id === id)
}

// try this and it will give error. Constraints guarantee that the items that I pass to the function have the fields defined on the extended type :)
// const itemsWithoutId = [{text: "test"}]
// findItemIndexById(itemsWithoutId, "testId")


// First I store the item in the item constant. Use the removeItemAtIndex function to remove the item from its original position and then insert it back to the new position using the insertItemAtIndex function.
export const moveItem = <TItem>(array: TItem[], from: number, to: number) => {
  const item = array[from]
  return insertItemAtIndex(removeItemAtIndex(array, from), item, to)
}

export function removeItemAtIndex<TItem>(array: TItem[], index: number) {
  return [...array.slice(0, index), ...array.slice(index + 1)]
}

export function insertItemAtIndex<TItem>(
  array: TItem[],
  item: TItem,
  index: number
) {
  return [...array.slice(0, index), item, ...array.slice(index)]
}