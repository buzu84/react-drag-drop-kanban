import { createContext, useContext, FC } from "react"
import {
  appStateReducer,
  AppState,
  List,
  Task
} from "./appStateReducer"

type AppStateContextProps = {
  lists: List[]
  getTasksByListId(id: string): Task[]
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
)

const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Advanced React" }]
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }]
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Unit testing" }]
    }
  ]
}

export const AppStateProvider: FC = ({ children }) => {
  const { lists } = appData

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || []
  }

  return (
    <AppStateContext.Provider value={{ lists, getTasksByListId }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  return useContext(AppStateContext)
}
