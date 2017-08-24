open Interval;

type action =
  | Increment
  | Decrement
  | StartIncrementing intervalId
  | StopIncrementing;

type deferredAction = (action => unit) => unit;

let incrementAction = Increment;

let decrementAction = Decrement;

let startIncrementingAction intervalId => StartIncrementing intervalId;

let stopIncrementingAction = StopIncrementing;

let increment dispatch => incrementAction |> dispatch;

let decrement dispatch => decrementAction |> dispatch;

let startIncrementing intervalId dispatch => startIncrementingAction intervalId |> dispatch;

let stopIncrementing dispatch => stopIncrementingAction |> dispatch;

let incrementEverySecond dispatch => {
  let intervalId = setInterval (fun () => increment dispatch) 1000;
  startIncrementing intervalId dispatch
};

let stopIncrementingEverySecond intervalId dispatch => {
  clearInterval intervalId;
  stopIncrementing dispatch
};
