open State;

open Reducer;

external register_service_worker : unit => unit = "" [@@bs.module "./registerServiceWorker"];

let createComponent state dispatch => <CounterApp state dispatch />;

module Provider = ProviderFactory.MakeProvider State;

ReactDOMRe.renderToElementWithId
  <Provider reducer initialState=(createState ()) createComponent /> "root";
