import { createSlice } from '@reduxjs/toolkit'
import { addUser } from '../thunks/addUser'
import { fetchUsers } from '../thunks/fetchUsers'
import { removeUser } from '../thunks/removeUser'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload)
    },
  },
})

export const { addData } = usersSlice.actions
export const usersReducer = usersSlice.reducer
