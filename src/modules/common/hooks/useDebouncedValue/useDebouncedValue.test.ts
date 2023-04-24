import { act, renderHook } from '@testing-library/react-hooks'

import { useDebouncedValue } from './useDebouncedValue'

describe('useDebouncedValue', () => {
  jest.useFakeTimers()

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('should return the initial value', () => {
    const { result } = renderHook(() => useDebouncedValue('test', 300))
    expect(result.current).toBe('test')
  })

  it('should return the debounced value after the delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      {
        initialProps: { value: 'initial', delay: 300 }
      }
    )

    rerender({ value: 'updated', delay: 300 })

    act(() => {
      jest.advanceTimersByTime(299)
    })

    expect(result.current).toBe('initial')

    act(() => {
      jest.advanceTimersByTime(1)
    })

    expect(result.current).toBe('updated')
  })
})
