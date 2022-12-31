import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'
import { AlbumsListItem } from './AlbumsListItem'
import Button from './Button'
import { Skeleton } from './Skeleton'

export const AlbumsList = ({ user }) => {
  const { data, error, isFetching } = useFetchAlbumsQuery(user)
  const [addAlbum, addAlbumResult] = useAddAlbumMutation()

  const handleAddAlbum = () => {
    addAlbum(user)
  }

  let content
  if (isFetching) {
    content = <Skeleton className="h-10 w-full" times={3} />
  } else if (error) {
    content = <div>Error loading albums</div>
  } else {
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album} />
    })
  }

  return (
    <div>
      <div className="m-2 flex items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button loading={addAlbumResult.isLoading} onClick={handleAddAlbum}>
          Add album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  )
}
