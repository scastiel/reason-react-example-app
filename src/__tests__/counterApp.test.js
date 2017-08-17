import React from 'react'
import { counterApp as CounterApp } from '../../lib/js/src/counterApp.js'
import { createState } from '../../lib/js/src/state'
import { shallow } from 'enzyme'

describe('CounterApp component', () => {
  it('renders without crash', () => {
    const state = createState()
    const dispatch = () => {}
    const wrapper = shallow(<CounterApp state={state} dispatch={dispatch} />)
    expect(wrapper).toMatchSnapshot()
  })
})
