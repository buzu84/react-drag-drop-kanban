import { Action } from './actions'
import { nanoid } from 'nanoid'
import {
  findItemIndexById,
  moveItem
} from "../utils/arrayUtils"


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

    default: {
      break
    }
  }
}

// MoveList takes the draggedId and the hoverId from the action payload. Then it calculates the dragged and the hovered columns and then it overrides the draft.lists value with the result of the moveItem function, which takes the source array.