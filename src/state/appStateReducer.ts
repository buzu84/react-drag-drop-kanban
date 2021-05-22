import { Action } from './actions'
import { nanoid } from 'nanoid'


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

    default: {
      break
    }
  }
}