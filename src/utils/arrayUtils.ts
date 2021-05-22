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