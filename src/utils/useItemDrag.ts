import { useDrag } from "react-dnd"
import { useAppState } from "../state/AppStateContext"
import { DragItem } from "../DragItem"
import { setDraggedItem } from "../state/actions"

// drag method accepts the ref of a draggable element. Whenever we start dragging the item, the hook will dispatch a SET_DRAG_ITEM action to save the item in the app state. When we stop dragging, it will dispatch this action again with null as the payload.
// useDrag hook with options object:
// type - CARD or COLUMN
// item - returns dragged item object and dispatches the SET_DRAGGED_ITEM action
// end - is called when I release the item *** 

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState()
  const [, drag] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item))
      return item
    },
    end: () => dispatch(setDraggedItem(null))
  })
  return { drag }
}