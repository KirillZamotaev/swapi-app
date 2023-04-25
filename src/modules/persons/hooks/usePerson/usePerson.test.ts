import '@testing-library/jest-dom/extend-expect'

import { renderHook, act } from '@testing-library/react-hooks'
import { People } from 'swapi-ts'

import { mockLukeSkywalker } from 'modules/persons/mocks/personMock'

import { usePerson } from './usePerson'

jest.mock('swapi-ts')

describe('usePerson', () => {
  it('should fetch person data and set loading state', async () => {
    const mockPersonData = mockLukeSkywalker

    const findBySearchMock = jest.fn().mockResolvedValue({
      resources: [{ value: mockPersonData }]
    })
    ;(People.findBySearch as jest.Mock) = findBySearchMock

    const { result, waitForNextUpdate } = renderHook(() =>
      usePerson('Luke Skywalker')
    )

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBe(null)

    await act(async () => {
      await waitForNextUpdate()
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toEqual(mockPersonData)

    expect(People.findBySearch).toHaveBeenCalledWith(['Luke Skywalker'])
  })

  it('should not fetch person data when no name is provided', async () => {
    const { result } = renderHook(() => usePerson())

    // Assert initial loading state
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBe(null)

    // Assert that findBySearch method was not called
    expect(People.findBySearch).not.toHaveBeenCalled()
  })
})
