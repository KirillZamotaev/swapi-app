import { renderHook } from '@testing-library/react-hooks'

import { localStorageMock } from 'modules/common/mocks/localStorageMock'
import { mockLukeSkywalker } from 'modules/persons/mocks/personMock'

import { usePerson } from '../usePerson'

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
    expect(result.current.data).toEqual(mockLukeSkywalker)
    expect(localStorageMock.getItem(result.current.id)).toEqual(
      JSON.stringify(mockLukeSkywalker)
    )
  })

  it('should fetch person data from local storage when available', async () => {
    localStorageMock.setItem(
      'Luke Skywalker',
      JSON.stringify(mockLukeSkywalker)
    )

    const { result, waitForNextUpdate } = renderHook(() =>
      usePerson('Luke Skywalker')
    )
    expect(result.current.isLoading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toEqual(mockLukeSkywalker)
  })
})
