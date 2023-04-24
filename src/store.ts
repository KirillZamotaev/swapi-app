import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { personsReducer } from './modules/persons'

const store = configureStore({
  reducer: {
    persons: personsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
