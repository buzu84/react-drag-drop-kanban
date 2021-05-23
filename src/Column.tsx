import { useRef } from "react"
import { ColumnContainer, ColumnTitle } from "./styles"
import { useAppState } from "./state/AppStateContext"
import { Card } from "./Card"
import { AddNewItem } from './AddNewItem'
import {
  addTask,
  moveTask,
  moveList,
  setDraggedItem
} from "./state/actions"
import { useItemDrag } from "./utils/useItemDrag"
import { useDrop } from "react-dnd"
import { isHidden } from "./utils/isHidden"


// isPreview is optional so I don't need to pass it to regular columns.
type ColumnProps = {
  text: string
  id: string
  isPreview?: boolean
}

// when hover over another column I’ll dispatch a MOVE_LIST action to swap the dragged and target column positions
// pass to useDrop hook the accepted item type and then define the hover callback. The hover callback is triggered whenever you move the dragged item above the drop target. Inside hover callback I check that dragIndex and hoverIndex are not the same (which means we aren’t hovering above the dragged item).
// If the dragIndex and hoverIndex are different, I dispatch a MOVE_LIST action. Finally, we update the index of the react-dnd item reference, combine the drag and drop calls.

export const Column = ({ text, id, isPreview }: ColumnProps) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState()
  const tasks = getTasksByListId(id)
  const ref = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover() {
      if (!draggedItem) {
        return
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return
        }
        dispatch(moveList(draggedItem.id, id))
      } else {
        if (draggedItem.columnId === id) {
          return
        }
        if (tasks.length) {
          return
        }
        dispatch(
          moveTask(draggedItem.id, null, draggedItem.columnId, id)
        )
        dispatch(
          setDraggedItem({ ...draggedItem, columnId: id })
        )
      }
    }
  })

  const { drag } = useItemDrag({ type: "COLUMN", id, text })

  drag(drop(ref))

  return (
    <ColumnContainer isPreview={isPreview} ref={ref} isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)} >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map(task => (
        <Card text={task.text} key={task.id} id={task.id} columnId={id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={text => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  )
}