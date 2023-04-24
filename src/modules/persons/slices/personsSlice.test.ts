import { configureStore } from '@reduxjs/toolkit'
import { IPeople, People } from 'swapi-ts'

import { personsReducer, fetchPersons, searchPersons } from './personsSlice'
import { mockLukeSkywalker } from '../mocks/personMock'

jest.mock('swapi-ts')

describe('personsSlice', () => {
  const store = configureStore({ reducer: { persons: personsReducer } })

  const mockPersonData: IPeople = mockLukeSkywalker

  beforeEach(() => {
    jest.clearAllMocks()
    store.dispatch({ type: 'test/reset' })
  })

  it('should fetch persons and update the state', async () => {
    const findBySearchMock = jest.fn().mockResolvedValue({
      resources: [{ value: mockPersonData }]
    })
    ;(People.find as jest.Mock) = findBySearchMock

    await store.dispatch(fetchPersons())

    const currentState = store.getState().persons

    expect(currentState.persons).toEqual([mockPersonData])
    expect(currentState.isLoading).toBe(false)
    expect(currentState.error).toBe(false)

    expect(People.find).toHaveBeenCalledTimes(1)
  })

  it('should search persons and update the state', async () => {
    const findBySearchMock = jest.fn().mockResolvedValue({
      resources: [{ value: mockPersonData }]
    })
    ;(People.findBySearch as jest.Mock) = findBySearchMock

    await store.dispatch(searchPersons('Luke Skywalker'))

    const currentState = store.getState().persons

    expect(currentState.persons).toEqual([mockPersonData])
    expect(currentState.isLoading).toBe(false)

    expect(People.findBySearch).toHaveBeenCalledTimes(1)
    expect(People.findBySearch).toHaveBeenCalledWith(['Luke Skywalker'])
  })
})
