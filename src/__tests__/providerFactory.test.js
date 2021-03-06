import React from 'react'
import { MakeProvider } from '../providerFactory.re'
import CounterApp from '../counterApp.re'
import { shallow } from 'enzyme'
import { createState } from '../state.re'
import { increment, incrementAction } from '../actions.re'

const Provider = MakeProvider()[2]

describe('Provider component', () => {
  it('should render', () => {
    const reducer = jest.fn((state, action) => state)
    const initialState = createState()
    const createComponent = jest.fn((state, dispatch) => <span />)
    const wrapper = shallow(
      <Provider
        reducer={state => action => reducer(state, action)}
        initialState={initialState}
        createComponent={state => dispatch => createComponent(state, dispatch)}
      />
    )
    expect(wrapper).toMatchSnapshot()
    expect(createComponent.mock.calls.length).toEqual(1)
    expect(createComponent.mock.calls[0][0]).toEqual(initialState)
    const dispatch = createComponent.mock.calls[0][1]
    dispatch(d => d(incrementAction))
    expect(reducer.mock.calls.length).toEqual(1)
    expect(reducer.mock.calls[0]).toEqual([initialState, incrementAction])
  })
})
