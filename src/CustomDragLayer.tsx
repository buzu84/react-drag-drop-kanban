import { useDragLayer } from "react-dnd"
import { Column } from "./Column"
import { CustomDragLayerContainer } from "./styles"
import { useAppState } from "./state/AppStateContext"

// -useDragLayer - provide the information about the dragged item.
// -Column - it is dragged element
// -CustomDragLayerContainer - dragging layer, I’ll render the dragging preview inside of it.
// -useAppState - I will get the draggedItem from it

// The useDragLayer hook allows to get the information from the React-DnD internal state. To do this I pass a collector function to it, that has access to the monitor object.

export const CustomDragLayer = () => {
  const { draggedItem } = useAppState()
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset()
  }))
  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <Column
        id={draggedItem.id}
        text={draggedItem.text}
      />
    </CustomDragLayerContainer>
  ) : null
}