import { CardContainer } from "./styles"

type CardProps = {
  text: string
  id: string
  columnId: string
  isPreview?: boolean
}

export const Card = ({ text, id, columnId, isPreview }: CardProps) => {
  return <CardContainer>{text}</CardContainer>
}