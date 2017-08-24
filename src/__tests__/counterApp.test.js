import React from 'react'
import { counterApp as CounterApp } from '../counterApp.re'
import { createState } from '../state.re'
import { shallow } from 'enzyme'

describe('CounterApp component', () => {
  it('renders without crash', () => {
    const state = createState()
    const dispatch = () => {}
    const wrapper = shallow(<CounterApp state={state} dispatch={dispatch} />)
    expect(wrapper).toMatchSnapshot()
  })
})
