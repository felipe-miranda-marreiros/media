import { faker } from '@faker-js/faker'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const pause = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration))
}

export const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005/',
    // fetchFn permite sobrescrever fetches.
    fetchFn: async (...args) => {
      await pause(1000)
      return fetch(...args)
    },
  }),
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation({
        /*
        invalidatesTags abaixo só funciona porque a propriedade album possui o id do usuário.
        Mesmo id do fetchAlbums.
        */
        invalidatesTags: (result, error, album) => {
          return [{ type: 'Album', id: album.id }]
        },
        query: (album) => {
          return {
            method: 'DELETE',
            url: `/albums/${album.id}`,
          }
        },
      }),
      addAlbum: builder.mutation({
        /*
        Quando o hook addAlbum for chamada, ela invalidará a tag 'UsersAlbums', fazendo refetch do hook
        fetchAlbums.
        */
        invalidatesTags: (result, error, user) => {
          return [{ type: 'UsersAlbums', id: user.id }]
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
        // Se uma das tags no providesTags for inválida, então fetchAlbums será invocada novamente.
        providesTags: (result, error, user) => {
          const albumAndUserTags = result.map((album) => {
            return { type: 'Album', id: album.id }
          })
          albumAndUserTags.push({ type: 'UsersAlbums', id: user.id })
          return albumAndUserTags
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

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi
