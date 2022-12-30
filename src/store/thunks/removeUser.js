import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const removeUser = createAsyncThunk('users/remove', async (user) => {
  await axios.delete(`http://localhost:3000/users/${user.id}`)
  // Ao retornar user, ele será exposto no action.payload no extraReducers.
  return user
})
