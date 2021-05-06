export type Action =
  | {
    type: "ADD_LIST"
    payload: string
  }
  | {
    type: "ADD_TASK"
    payload: { text: string; listId: string }
  }

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


// For example, here is an if statement:
// if (action.type === "ADD_LIST") {
//   return typeof action.payload
//   // Will return "string"
// }
// if (action.type === "ADD_TASK") {
//   return typeof action.payload
//   // Will return { text: string; listId: string }
// }