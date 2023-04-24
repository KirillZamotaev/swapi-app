import { IPeople, People } from 'swapi-ts'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface PersonsState {
  persons: IPeople[]
  page: number
  itemsPerPage: number
  isLoading: boolean
  error: boolean
}

const initialState: PersonsState = {
  persons: [],
  page: 1,
  itemsPerPage: 10,
  isLoading: true,
  error: false
}

export const fetchPersons = createAsyncThunk<IPeople[] | undefined>(
  'person/fetchPersons',
  async () => {
    try {
      const data = await People.find()
      return data.resources?.map(({ value }) => value)
    } catch (err) {
      console.log(err)
    }
  }
)

export const searchPersons = createAsyncThunk<IPeople[] | undefined, string>(
  'person/searchPersons',
  async (request) => {
    try {
      const data = await People.findBySearch([request])
      return data.resources?.map(({ value }) => value)
    } catch (err) {
      console.log(err)
    }
  }
)

const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPersons.pending, (state) => {
      state.error = false
      state.persons = []
      state.isLoading = true
    })
    builder.addCase(fetchPersons.fulfilled, (state, action) => {
      state.persons = action.payload || []
      state.isLoading = false
    })
    builder.addCase(fetchPersons.rejected, (state) => {
      state.error = true
      state.isLoading = false
    })
    builder.addCase(searchPersons.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(searchPersons.fulfilled, (state, action) => {
      state.persons = action.payload || []
      state.isLoading = false
    })
  }
})

export const personsReducer = personsSlice.reducer
