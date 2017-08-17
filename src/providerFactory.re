module MakeProvider (State: {type state;}) => {
  type self = ReasonReact.self State.state ReasonReact.noRetainedProps;
  let component = ReasonReact.statefulComponent "Provider";
  let make ::reducer ::initialState ::createComponent _children => {
    let dispatchAction action state => ReasonReact.Update (reducer state action);
    let update (self: self) deferredAction => {
      let onDispatch action => self.update (fun () self => dispatchAction action self.state) ();
      deferredAction onDispatch
    };
    {
      ...component,
      initialState: fun () => initialState,
      render: fun (self: self) => createComponent self.state (update self)
    }
  };
  let provider =
    ReasonReact.wrapReasonForJs
      ::component
      (
        fun jsProps =>
          make
            reducer::jsProps##reducer
            initialState::jsProps##initialState
            createComponent::jsProps##createComponent
            [||]
      );
};
