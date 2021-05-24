import { FadingCircle } from "styled-spinkit"

import React from 'react'

interface Props {
  
}

export const Spinner = (props: Props) => {
  return (
    <div>
      <FadingCircle color={"#333"} size={200} />
    </div>
  )
}
