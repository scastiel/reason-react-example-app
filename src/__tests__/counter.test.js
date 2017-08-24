import React from 'react'
import { counter as Counter } from '../counter.re'
import { shallow } from 'enzyme'

describe('Counter component', () => {
  it('renders with value 0 without intervalId', () => {
    const wrapper = shallow(<Counter counter={0} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders with value 10 without intervalId', () => {
    const wrapper = shallow(<Counter counter={10} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders with value 10 with intervalId', () => {
    const wrapper = shallow(<Counter counter={10} intervalId={1234} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('calls increment when plus button is clicked', () => {
    const increment = jest.fn()
    const wrapper = shallow(
      <Counter counter={10} increment={increment} decrement={() => {}} />
    )
    wrapper.find('.plus-button').simulate('click')
    expect(increment.mock.calls.length).toEqual(1)
  })

  it('calls decrement when minus button is clicked', () => {
    const decrement = jest.fn()
    const wrapper = shallow(
      <Counter counter={10} increment={() => {}} decrement={decrement} />
    )
    wrapper.find('.minus-button').simulate('click')
    expect(decrement.mock.calls.length).toEqual(1)
  })

  it('calls incrementEverySecond when "+ every 1s" button is clicked', () => {
    const incrementEverySecond = jest.fn()
    const wrapper = shallow(
      <Counter counter={10} incrementEverySecond={incrementEverySecond} />
    )
    wrapper.find('.plus-1s-button').simulate('click')
    expect(incrementEverySecond.mock.calls.length).toEqual(1)
  })

  it('calls stopIncrementingEverySecond when "+ every 1s" button is clicked', () => {
    const stopIncrementingEverySecond = jest.fn()
    const wrapper = shallow(
      <Counter
        counter={10}
        intervalId={[1234]} // some 1234
        stopIncrementingEverySecond={stopIncrementingEverySecond}
      />
    )
    wrapper.find('.stop-plus-1s-button').simulate('click')
    expect(stopIncrementingEverySecond.mock.calls.length).toEqual(1)
    expect(stopIncrementingEverySecond.mock.calls[0][0]).toEqual(1234)
  })
})
