import { DragItem } from "../DragItem"

// This function compares the type and id of the currently dragged item with the type and id I pass to it as arguments
export const isHidden = (
  isPreview: boolean | undefined,
  draggedItem: DragItem | null,
  itemType: string,
  id: string,
): boolean => {
  return Boolean(
    !isPreview &&
      draggedItem &&
      draggedItem.type === itemType &&
      draggedItem.id === id
  )
}