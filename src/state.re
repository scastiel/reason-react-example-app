open Interval;

type state = {
  counter: int,
  intervalId: option intervalId
};

let createState () => {counter: 0, intervalId: None};

let setCounter state counter => {...state, counter};

let setIntervalId state intervalId => {...state, intervalId: Some intervalId};

let clearIntervalId state => {...state, intervalId: None};
