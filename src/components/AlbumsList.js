import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'
import Button from './Button'
import { ExpandablePanel } from './ExpandablePanel'
import { Skeleton } from './Skeleton'

export const AlbumsList = ({ user }) => {
  const { data, error, isLoading, isError, isSuccess } =
    useFetchAlbumsQuery(user)
  const [addAlbum] = useAddAlbumMutation()

  const handleAddAlbum = () => {
    addAlbum(user)
  }

  let content
  if (isLoading) {
    content = <Skeleton times={3} />
  } else if (error) {
    content = <div>Error loading albums</div>
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>
      return (
        <ExpandablePanel key={album.id} header={header}>
          List of photos
        </ExpandablePanel>
      )
    })
  }

  return (
    <div>
      <div>
        {user.name}
        <Button onClick={handleAddAlbum}>Add album</Button>
      </div>
      <div>{content}</div>
    </div>
  )
}
