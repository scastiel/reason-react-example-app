import { reducer } from '../../lib/js/src/reducer'
import {
  incrementAction,
  decrementAction,
  startIncrementingAction,
  stopIncrementingAction
} from '../../lib/js/src/actions'
import {
  createState,
  setCounter,
  getCounter,
  clearIntervalId,
  setIntervalId
} from '../../lib/js/src/state'

describe('Reducer', () => {
  describe('with Increment action', () => {
    it('increments counter', () => {
      const state = setCounter(createState(), 0)
      const newState = reducer(state, incrementAction)
      expect(newState).toEqual(setCounter(state, 1))
    })
  })

  describe('with Decrement action', () => {
    it('decrements counter', () => {
      const state = setCounter(createState(), 1)
      const newState = reducer(state, decrementAction)
      expect(newState).toEqual(setCounter(state, 0))
    })
  })

  describe('with StartIncrementing action', () => {
    it('does nothing if already incrementing', () => {
      const state = setIntervalId(createState(), 1234)
      const newState = reducer(state, startIncrementingAction(5678))
      expect(newState).toEqual(state)
    })
    it('starts incrementing if not already incrementing', () => {
      const state = clearIntervalId(createState())
      const newState = reducer(state, startIncrementingAction(5678))
      expect(newState).toEqual(setIntervalId(state, 5678))
    })
  })

  describe('with StopIncrementing action', () => {
    it('does nothing if not incrementing', () => {
      const state = clearIntervalId(createState())
      const newState = reducer(state, stopIncrementingAction)
      expect(newState).toEqual(state)
    })
    it('stops incrementing if incrementing', () => {
      const state = setIntervalId(createState(), 5678)
      const newState = reducer(state, stopIncrementingAction)
      expect(newState).toEqual(clearIntervalId(state))
    })
  })
})
