import { DragItem } from "../DragItem"

export type Action =
  | {
    type: "ADD_LIST"
    payload: string
  }
  | {
    type: "ADD_TASK"
    payload: { text: string; listId: string }
  }
  | {
    type: "MOVE_LIST"
    payload: {
      draggedId: string
      hoverId: string
    }
  }
  | {
    type: "SET_DRAGGED_ITEM"
    payload: DragItem | null
  }
  // need to be able to set it to null if not dragging anything
  | {
    type: "MOVE_TASK"
    payload: {
      draggedItemId: string
      hoveredItemId: string | null
      sourceColumnId: string
      targetColumnId: string
    }
  }
// MOVE_TASK needs to know between which columns we are dragging the card.

export const addTask = (
  text: string,
  listId: string,
): Action => ({
  type: "ADD_TASK",
  payload: {
    text,
    listId
  }
})

export const addList = (
  text: string,
): Action => ({
  type: "ADD_LIST",
  payload: text
})


// MoveList action has draggedId and hoverId in its payload. When we start dragging the column, we remember its id and pass it as draggedId . When we hover over other columns we take their ids and use them as a hoverId .
export const moveList = (
  draggedId: string,
  hoverId: string,
): Action => ({
  type: "MOVE_LIST",
  payload: {
    draggedId,
    hoverId,
  }
})

export const setDraggedItem = (
  draggedItem: DragItem | null,
): Action => ({
  type: "SET_DRAGGED_ITEM",
  payload: draggedItem
})

export const moveTask = (
  draggedItemId: string,
  hoveredItemId: string | null,
  sourceColumnId: string,
  targetColumnId: string
): Action => ({
  type: "MOVE_TASK",
  payload: {
    draggedItemId,
    hoveredItemId,
    sourceColumnId,
    targetColumnId
  }
})

// For example, here is an if statement:
// if (action.type === "ADD_LIST") {
//   return typeof action.payload
//   // Will return "string"
// }
// if (action.type === "ADD_TASK") {
//   return typeof action.payload
//   // Will return { text: string; listId: string }
// }