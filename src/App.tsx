import React, { FC } from 'react';
import { AppContainer } from "./styles"
import { AddNewItem } from "./AddNewItem"
import { Column } from "./Column"
import { Card } from "./Card"

export const App: FC = ({ children }) => {
  return (
    <AppContainer>
      <Column text="To Do">
        <Card text="Redux" />
      </Column>
      <Column text="In Progress">
        <Card text="Learn Typescript" />
      </Column>
      <Column text="Done">
        <Card text="Styled components" />
      </Column>
      <AddNewItem toggleButtonText="+ Add another list" onAdd={console.log} />
    </AppContainer>
    )
  }
