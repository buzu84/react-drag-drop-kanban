import { Action } from './actions'
import { nanoid } from 'nanoid'
import {
  findItemIndexById,
  moveItem
} from "../utils/arrayUtils"
import { DragItem } from "../DragItem"

export type Task = {
  id: string
  text: string
}

export type List = {
  id: string
  text: string
  tasks: Task[]
}

export type AppState = {
  lists: List[]
  draggedItem: DragItem | null
}

// I renamed the state into draft, so I know that I can mutate it(use-immer)
export const appStateReducer = (draft: AppState, action: Action): AppState | void => {
  switch (action.type) {
    // ...
    case "ADD_LIST": {
      draft.lists.push({
        id: nanoid(),
        text: action.payload,
        tasks: []
      })
      break
    }
    case "ADD_TASK": {
      const { text, listId } = action.payload
      const targetListIndex = findItemIndexById(draft.lists, listId)
      draft.lists[targetListIndex].tasks.push({
        id: nanoid(),
        text
      })
      break
    }
    case "MOVE_LIST": {
      const { draggedId, hoverId } = action.payload
      const dragIndex = findItemIndexById(draft.lists, draggedId)
      const hoverIndex = findItemIndexById(draft.lists, hoverId)
      draft.lists = moveItem(draft.lists, dragIndex, hoverIndex)
      break
    }
    case "SET_DRAGGED_ITEM": {
      draft.draggedItem = action.payload
      break
    }
    case "MOVE_TASK": {
      // --- destructure the action.payload => 
      const {
        draggedItemId,
        hoveredItemId,
        sourceColumnId,
        targetColumnId
      } = action.payload
      // --- get the source and target list indices =>
      const sourceListIndex = findItemIndexById(
        draft.lists,
        sourceColumnId
      )
      const targetListIndex = findItemIndexById(
        draft.lists,
        targetColumnId
      )
      // --- find the indices of the dragged and hovered items
      const dragIndex = findItemIndexById(
        draft.lists[sourceListIndex].tasks,
        draggedItemId
      )
      // return 0 if the index for the hoverId could not be found - possible because while dragging the card to an empty column it shall pass null as hoverId for the card.
      const hoverIndex = hoveredItemId
        ? findItemIndexById(
          draft.lists[targetListIndex].tasks,
          hoveredItemId
        )
        : 0
      // store the moved item in a variable
      const item = draft.lists[sourceListIndex].tasks[dragIndex]
      // Remove the task from the source list
      draft.lists[sourceListIndex].tasks.splice(dragIndex, 1)
      // Add the task to the target list
      draft.lists[targetListIndex].tasks.splice(hoverIndex, 0, item)
      break
    }

    default: {
      break
    }
  }
}

// MoveList takes the draggedId and the hoverId from the action payload. Then it calculates the dragged and the hovered columns and then it overrides the draft.lists value with the result of the moveItem function, which takes the source array.