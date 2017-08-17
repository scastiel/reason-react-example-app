open State;

open Reducer;

let createComponent state dispatch => <CounterApp state dispatch />;

module Provider = ProviderFactory.MakeProvider State;

ReactDOMRe.renderToElementWithId
  <Provider reducer initialState=(createState ()) createComponent /> "root";
