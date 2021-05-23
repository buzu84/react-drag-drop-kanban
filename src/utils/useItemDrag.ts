import { useEffect } from "react"
import { useDrag } from "react-dnd"
import { useAppState } from "../state/AppStateContext"
import { DragItem } from "../DragItem"
import { setDraggedItem } from "../state/actions"
import { getEmptyImage } from "react-dnd-html5-backend"
// => getEmptyImage function to create the preview that won’t be rendered.

// drag method accepts the ref of a draggable element. Whenever we start dragging the item, the hook will dispatch a SET_DRAG_ITEM action to save the item in the app state. When we stop dragging, it will dispatch this action again with null as the payload.
// useDrag hook with options object:
// type - CARD or COLUMN
// item - returns dragged item object and dispatches the SET_DRAGGED_ITEM action
// end - is called when I release the item *** 



export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState()
  const [, drag, preview] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item))
      return item
    },
    end: () => dispatch(setDraggedItem(null))
  })
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])
  return { drag }
}
// The preview function accepts an element or node to use as a drag preview. Use getEmptyImage here.