open State;

open Actions;

let component = ReasonReact.statelessComponent "CounterApp";

let make state::(state: state) dispatch::(dispatch: deferredAction => unit) _children => {
  ...component,
  render: fun _ => {
    let onIncrement () => dispatch increment;
    let onIncrementEverySecond () => dispatch incrementEverySecond;
    let onStopIncrementingEverySecond intervalId =>
      dispatch (stopIncrementingEverySecond intervalId);
    let onDecrement () => dispatch decrement;
    <Counter
      intervalId=state.intervalId
      counter=state.counter
      increment=onIncrement
      incrementEverySecond=onIncrementEverySecond
      stopIncrementingEverySecond=onStopIncrementingEverySecond
      decrement=onDecrement
    />
  }
};

let counterApp =
  ReasonReact.wrapReasonForJs
    ::component (fun jsProps => make state::jsProps##state dispatch::jsProps##dispatch [||]);
