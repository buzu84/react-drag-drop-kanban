import { createContext, useContext, Dispatch, useEffect } from "react"
import {
  appStateReducer,
  AppState,
  List,
  Task
} from "./appStateReducer"
import { Action } from './actions'
import { useImmerReducer } from 'use-immer'
// library that allows you to mutate an object/it creates a new object instance based on my mutations
import { DragItem } from "../DragItem"
import { save } from "../api"
import { withInitialState } from "../withInitialState"

type AppStateContextProps = {
  draggedItem: DragItem | null
  lists: List[]
  getTasksByListId(id: string): Task[]
  dispatch: Dispatch<Action>
}

// I define the children prop as a required field to make it clear that the AppStateProvider is supposed to wrap other components
type AppStateProviderProps = {
  children: React.ReactNode
  initialState: AppState
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
)

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }) => {

    const [state, dispatch] = useImmerReducer(
      appStateReducer,
      initialState
    )

    const { draggedItem, lists } = state

    useEffect(() => {
      save(state)
    }, [state])

    const getTasksByListId = (id: string) => {
      return lists.find((list) => list.id === id)?.tasks || []
    }

    return (
      <AppStateContext.Provider value={{
        draggedItem,
        lists,
        getTasksByListId,
        dispatch
      }}>
        {children}
      </AppStateContext.Provider>
    )
  }
)

export const useAppState = () => {
  return useContext(AppStateContext)
}
