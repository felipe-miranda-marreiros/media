import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { albumsApi } from './apis/albumsApi'
import { photosApi } from './apis/photosApi'
import { usersReducer } from './slices/usersSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware)
  },
})

setupListeners(store.dispatch)

export * from './thunks/fetchUsers'
export * from './thunks/addUser'
export * from './thunks/removeUser'

export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from './apis/albumsApi'

export {
  useAddPhotoMutation,
  useFetchPhotosQuery,
  useRemovePhotoMutation,
} from './apis/photosApi'
