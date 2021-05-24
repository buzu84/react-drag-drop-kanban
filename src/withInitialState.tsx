import { useState, useEffect, ComponentType } from "react"
import { AppState } from "./state/appStateReducer"
import { load } from "./api"

// define a type that will represent the props that have been injected.
type InjectedProps = {
  initialState: AppState
}

// - generic type that accepts the TBaseProps type variable that will represent the original props type of the wrapped component
// - Omit to remove the fields of the InjectedProps type from it
type PropsWithoutInjected<TBaseProps> = Omit<
  TBaseProps,
  keyof InjectedProps
>

// WrappedComponent type - contains the props from the type variable TProps and the props defined in the InjectedProps .
// TProps is defined as a type argument of our generic function withInitialState
// Func returns a nameless function component
// Omit - allows to create a new type that won’t have the keys of the InjectedProps type(the utility type Omit constructs a new type removing the keys that you provide to it:)

// 3 diff states: pending, success, failure
export function withInitialState<TProps>(
  WrappedComponent: ComponentType<
    PropsWithoutInjected<TProps> & InjectedProps
  >
) {
  return (props: PropsWithoutInjected<TProps>) => {
    const [initialState, setInitialState] = useState<AppState>({
      lists: [],
      draggedItem: null
    })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | undefined>()
    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const data = await load()
          setInitialState(data)
        } catch (e) {
          setError(e)
        }
        setIsLoading(false)
      }
      fetchInitialState()
    }, [])
    if (isLoading) {
      return <div>Loading</div>
    }
    if (error) {
      return <div>{error.message}</div>
    }
    return <WrappedComponent {...props} initialState={initialState} />
  }
}
