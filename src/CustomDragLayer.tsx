import { useDragLayer } from "react-dnd"
import { Column } from "./Column"
import {
  CustomDragLayerContainer,
  DragPreviewWrapper
} from "./styles"
import { useAppState } from "./state/AppStateContext"
import { Card } from "./Card"

// -useDragLayer - provide the information about the dragged item.
// -Column - it is dragged element
// -CustomDragLayerContainer - dragging layer, I’ll render the dragging preview inside of it.
// -useAppState - I will get the draggedItem from it

// The useDragLayer hook allows to get the information from the React-DnD internal state. To do this I pass a collector function to it, that has access to the monitor object, currentOffset value provides the position of the dragged item.

// isPreview - fix -> isHidden util will always return true (compare the type and the id of the column with the type and the id field of the dragged item)

export const CustomDragLayer = () => {
  const { draggedItem } = useAppState()
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset()
  }))
  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        {draggedItem.type === "COLUMN" ? (
          <Column
            id={draggedItem.id}
            text={draggedItem.text}
            isPreview
          />
        ) : (
          <Card
            columnId={draggedItem.columnId}
            isPreview
            id={draggedItem.id}
            text={draggedItem.text}
          />
        )}
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null
}