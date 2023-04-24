import { renderHook } from '@testing-library/react-hooks'

import { mockLukeSkywalker } from 'modules/persons/mocks/personMock'

import { usePerson } from './usePerson'

const localStorageMock = (() => {
  let store: { [key: string]: string } = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    clear: () => {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

jest.mock('swapi-ts', () => ({
  People: {
    findBySearch: jest.fn().mockResolvedValue({
      resources: [
        {
          value: mockLukeSkywalker
        }
      ]
    })
  }
}))

describe('usePerson', () => {
  afterEach(() => {
    localStorageMock.clear()
  })

  it('should fetch person data from API and save to local storage when data is not in local storage', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      usePerson('Luke Skywalker')
    )

    expect(result.current.isLoading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toEqual({ name: 'Luke Skywalker' })
    expect(localStorageMock.getItem('Luke Skywalker')).toEqual(
      JSON.stringify({ name: 'Luke Skywalker' })
    )
  })

  it('should fetch person data from local storage when available', async () => {
    localStorageMock.setItem(
      'Luke Skywalker',
      JSON.stringify({ name: 'Luke Skywalker' })
    )

    const { result, waitForNextUpdate } = renderHook(() =>
      usePerson('Luke Skywalker')
    )

    expect(result.current.isLoading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toEqual({ name: 'Luke Skywalker' })
  })
})
