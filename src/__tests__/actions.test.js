import {
  increment,
  incrementAction,
  decrement,
  decrementAction,
  startIncrementing,
  startIncrementingAction,
  stopIncrementing,
  stopIncrementingAction,
  incrementEverySecond,
  stopIncrementingEverySecond
} from '../../lib/js/src/actions'

jest.useFakeTimers()

describe('Actions', () => {
  describe('increment', () => {
    it('should call dispatch with Increment action', () => {
      const dispatch = jest.fn()
      increment(null, dispatch)
      expect(dispatch.mock.calls.length).toEqual(1)
      expect(dispatch.mock.calls[0][0]).toEqual(incrementAction)
    })
  })
  describe('decrement', () => {
    it('should call dispatch with Decrement action', () => {
      const dispatch = jest.fn()
      decrement(null, dispatch)
      expect(dispatch.mock.calls.length).toEqual(1)
      expect(dispatch.mock.calls[0][0]).toEqual(decrementAction)
    })
  })
  describe('startIncrementing', () => {
    it('should call dispatch with StartIncrementing action', () => {
      const dispatch = jest.fn()
      startIncrementing(1234, dispatch)
      expect(dispatch.mock.calls.length).toEqual(1)
      expect(dispatch.mock.calls[0][0]).toEqual(startIncrementingAction(1234))
    })
  })
  describe('stopIncrementing', () => {
    it('should call dispatch with StopIncrementing action', () => {
      const dispatch = jest.fn()
      stopIncrementing(null, dispatch)
      expect(dispatch.mock.calls.length).toEqual(1)
      expect(dispatch.mock.calls[0][0]).toEqual(stopIncrementingAction)
    })
  })
  describe('incrementEverySecond', () => {
    it('should call setInterval, dispatch with StartIncrementingAction, and every second dispatch with Increment action', async () => {
      expect.assertions(8)
      const dispatch = jest.fn()
      incrementEverySecond(null, dispatch)
      expect(setInterval.mock.calls.length).toEqual(1)
      expect(setInterval.mock.calls[0][1]).toEqual(1000)
      expect(dispatch.mock.calls.length).toEqual(1)
      expect(dispatch.mock.calls[0][0]).toEqual(startIncrementingAction(1))
      jest.runOnlyPendingTimers()
      expect(dispatch.mock.calls.length).toEqual(2)
      expect(dispatch.mock.calls[1][0]).toEqual(incrementAction)
      jest.runOnlyPendingTimers()
      expect(dispatch.mock.calls.length).toEqual(3)
      expect(dispatch.mock.calls[2][0]).toEqual(incrementAction)
    })
  })
  describe('stopIncrementingEverySecond', () => {
    it('should call clearInterval and dispatch with StopIncrementing action', () => {
      const dispatch = jest.fn()
      stopIncrementingEverySecond(1234, dispatch)
      expect(clearInterval.mock.calls.length).toEqual(1)
      expect(clearInterval.mock.calls[0][0]).toEqual(1234)
      expect(dispatch.mock.calls.length).toEqual(1)
      expect(dispatch.mock.calls[0][0]).toEqual(stopIncrementingAction)
    })
  })
})

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
