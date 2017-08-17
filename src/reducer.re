open State;

open Actions;

type reducer = state => action => state;

let reducer: reducer =
  fun state action =>
    switch action {
    | Increment => {...state, counter: state.counter + 1}
    | Decrement => {...state, counter: state.counter - 1}
    | StartIncrementing intervalId =>
      switch state.intervalId {
      | None => {...state, intervalId: Some intervalId}
      | _ => state
      }
    | StopIncrementing =>
      switch state.intervalId {
      | Some _ => {...state, intervalId: None}
      | _ => state
      }
    };
