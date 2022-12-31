import { faker } from '@faker-js/faker'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  }),
  endpoints(builder) {
    return {
      addAlbum: builder.mutation({
        /*
        Quando o hook addAlbum for chamada, ela invalidará a tag 'Album', fazendo refetch do hook
        fetchAlbums.
        */
        invalidatesTags: (result, error, user) => {
          return [{ type: 'Album', id: user.id }]
        },
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          }
        },
      }),
      fetchAlbums: builder.query({
        // Quando fetchAlbums ser invocada, cada usuário terá uma tag com um id para invalidação.
        providesTags: (result, error, user) => {
          return [{ type: 'Album', id: user.id }]
        },
        query: (user) => {
          return {
            url: 'albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          }
        },
      }),
    }
  },
})

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi
