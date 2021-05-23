import { useState, useEffect, ComponentType } from "react"
import { AppState } from "./state/appStateReducer"

// define a type that will represent the props that have been injected.
type InjectedProps = {
  initialState: AppState
}

// WrappedComponent type - contains the props from the type variable TProps and the props defined in the InjectedProps .
// TProps is defined as a type argument of our generic function withInitialState
// Func returns a nameless function component
// Omit - allows to create a new type that won’t have the keys of the InjectedProps type(the utility type Omit constructs a new type removing the keys that you provide to it:)

export function withInitialState<TProps>(
  WrappedComponent: ComponentType<
    TProps & InjectedProps
  >
) {
  return (props: Omit<TProps, keyof InjectedProps>) => {
    const [initialState, setInitialState] = useState<AppState>({
      lists: [],
      draggedItem: null
    })
    // ...
    return (
      <WrappedComponent
        {...props as TProps}
        initialState={initialState}
      />
    )
  }
}