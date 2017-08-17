open Interval;

let component = ReasonReact.statelessComponent "Counter";

let make
    counter::(counter: int)
    intervalId::(intervalId: option intervalId)
    increment::(increment: unit => unit)
    incrementEverySecond::(incrementEverySecond: unit => unit)
    stopIncrementingEverySecond::(stopIncrementingEverySecond: intervalId => unit)
    decrement::(decrement: unit => unit)
    _children => {
  ...component,
  render: fun self =>
    <div>
      (ReasonReact.stringToElement ("Counter: " ^ string_of_int counter))
      <button className="plus-button" onClick=(self.handle (fun _ _ => increment ()))>
        (ReasonReact.stringToElement "+")
      </button>
      (
        switch intervalId {
        | None =>
          <button
            className="plus-1s-button" onClick=(self.handle (fun _ _ => incrementEverySecond ()))>
            (ReasonReact.stringToElement "+ every 1s")
          </button>
        | Some intervalId =>
          <button
            className="stop-plus-1s-button"
            onClick=(self.handle (fun _ _ => stopIncrementingEverySecond intervalId))>
            (ReasonReact.stringToElement "stop +")
          </button>
        }
      )
      <button className="minus-button" onClick=(self.handle (fun _ _ => decrement ()))>
        (ReasonReact.stringToElement "-")
      </button>
    </div>
};

let counter =
  ReasonReact.wrapReasonForJs
    ::component
    (
      fun jsProps =>
        make
          counter::jsProps##counter
          intervalId::jsProps##intervalId
          increment::jsProps##increment
          incrementEverySecond::jsProps##incrementEverySecond
          stopIncrementingEverySecond::jsProps##stopIncrementingEverySecond
          decrement::jsProps##decrement
          [||]
    );
