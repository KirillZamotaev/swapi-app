import { renderHook, act } from '@testing-library/react-hooks'

import { usePagination } from './usePagination'

describe('usePagination', () => {
  it('should calculate items per page', () => {
    const totalItems = new Array(50)

    const { result } = renderHook(() => usePagination(totalItems))
    act(() => {
      result.current.setItemsPerPage(10)
    })

    expect(result.current.items.length).toBe(10)
  })

  it('should update the current page when setPage is called', () => {
    const totalItems = new Array(50)

    const { result } = renderHook(() => usePagination(totalItems))

    act(() => {
      result.current.setPage(3)
    })

    expect(result.current.page).toBe(3)
  })
})
